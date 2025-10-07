# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Atendechat is a WhatsApp multi-tenant ticketing/customer service system built as a white-label solution. The system manages customer conversations via WhatsApp with features for campaigns, queues, automated responses, and team management.

## Architecture

### Monorepo Structure

The project is organized as a monorepo with two main applications:

- **backend/** - Express.js API server with TypeScript
- **frontend/** - React.js web application
- **instalador/** - Automated installer scripts for deployment

### Backend Architecture

**Technology Stack:**
- Express.js with TypeScript
- PostgreSQL with Sequelize ORM (using decorators via sequelize-typescript)
- Redis for queues and caching
- Socket.io for real-time communication
- Bull for job queues
- Baileys (@whiskeysockets/baileys) for WhatsApp integration

**Key Architectural Patterns:**

1. **Service-Oriented Structure**: Business logic is organized in service modules under `backend/src/services/`. Each feature has its own folder with CRUD operations (CreateService, UpdateService, ShowService, ListService, DeleteService, FindService, FindAllService).

2. **Multi-Tenancy**: The system is multi-tenant with `companyId` as the tenant identifier. Most models include a `companyId` foreign key. Users, Contacts, Tickets, Whatsapps, and most entities are scoped to a company.

3. **Queue System**: Uses Bull queues (via Redis) for:
   - Message sending (`messageQueue`)
   - Campaign processing (`campaignQueue`)
   - Scheduled messages (`sendScheduledMessages`)
   - User monitoring (`userMonitor`)
   - Queue monitoring (`queueMonitor`)

4. **WhatsApp Session Management**:
   - Baileys library handles WhatsApp Web protocol
   - Sessions are persisted and managed per WhatsApp connection
   - `StartAllWhatsAppsSessions` initializes all company connections on server start
   - `wbotMessageListener` handles incoming WhatsApp messages
   - `wbotMonitor` monitors connection status

5. **Real-time Communication**: Socket.io provides real-time updates with room-based channels:
   - `company-{companyId}-mainchannel` - Company-wide updates
   - `user-{userId}` - User-specific events
   - `ticket-{ticketId}` - Ticket conversation updates
   - `company-{companyId}-notification` - Admin notifications
   - `queue-{queueId}-notification` - Queue-specific notifications
   - `queue-{queueId}-pending` - Pending tickets per queue

6. **Authentication**: JWT-based with refresh tokens. Tokens include user info and company context.

**Directory Structure:**
```
backend/src/
├── controllers/     # Express route handlers
├── services/        # Business logic (organized by feature)
├── models/          # Sequelize models with decorators
├── routes/          # Express route definitions
├── helpers/         # Utility functions (Mustache templating, token creation, etc.)
├── libs/            # Core libraries (socket, wbot, cache)
├── database/        # Sequelize config and migrations
├── queues.ts        # Bull queue definitions and processors
└── app.ts           # Express app configuration
```

### Frontend Architecture

**Technology Stack:**
- React 17 with JavaScript (not TypeScript)
- Material-UI v4 for components
- React Router v5 for routing
- Socket.io-client for real-time updates
- React Query for server state management
- Axios for HTTP requests

**Key Patterns:**

1. **Context-Based State**: Global state managed via React Context:
   - `AuthContext` - User authentication state
   - `WhatsAppsContext` - WhatsApp connections state
   - `SocketContext` - Socket.io connection management
   - `TicketsContext` - Ticket list state
   - `ReplyingMessageContext` - Message reply state

2. **Component Organization**:
   - `components/` - Reusable UI components
   - `pages/` - Route-level page components
   - `layout/` - Layout components and theme configuration

3. **Theme System**: Supports light/dark mode with custom palette stored in localStorage

## Development Commands

### Backend

```bash
cd backend

# Development with auto-reload (TypeScript)
npm run dev:server

# Build TypeScript to JavaScript
npm run build

# Watch mode (compile on change)
npm run watch

# Start compiled server (requires build first)
npm start

# Database migrations
npm run db:migrate
npx sequelize db:migrate

# Database seeds
npm run db:seed
sequelize db:seed:all

# Run tests
npm test

# Lint code
npm run lint
```

### Frontend

```bash
cd frontend

# Start development server
npm start

# Build for production
npm run build

# Build for development (with source maps)
npm run builddev

# Run tests
npm test
```

### Root Level

The root package.json includes nodemon and ts-node for development utilities.

## Database

**Migrations**: Located in `backend/src/database/migrations/`. Run sequentially to set up schema.

**Key Models**:
- `Company` - Tenant/company entity with plan and schedule information
- `User` - System users with profile (admin/user) and queue assignments
- `Whatsapp` - WhatsApp connection instances (multi-connection support per company)
- `Contact` - Customer contacts with custom fields support
- `Ticket` - Conversation tickets with status (open/pending/closed), queue assignment, and user assignment
- `Message` - Individual messages within tickets
- `Queue` - Service queues for routing tickets
- `QueueOption` - Chatbot options for queue routing
- `Campaign` - Mass messaging campaigns
- `Tag` - Tags for organizing tickets and contacts
- `Schedule` - Scheduled message management
- `Plan` - Subscription plans for companies
- `Invoices` - Billing invoices

**Important Relationships**:
- Companies have many Users, Whatsapps, Tickets, Contacts
- Tickets belong to Contact, User, Queue, Whatsapp, Company
- Users have many-to-many relationship with Queues (UserQueue)
- Whatsapps have many-to-many relationship with Queues (WhatsappQueue)

## Configuration

### Backend Environment (.env)

Required variables in `backend/.env`:
```
NODE_ENV=development
BACKEND_URL=http://localhost:8080
FRONTEND_URL=http://localhost:3000
PORT=8080

DB_DIALECT=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_user
DB_PASS=your_password
DB_NAME=your_database

JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret

REDIS_URI=redis://:password@127.0.0.1:6379

USER_LIMIT=10
CONNECTIONS_LIMIT=3
```

### Frontend Environment (.env)

Required variables in `frontend/.env`:
```
REACT_APP_BACKEND_URL=http://localhost:8080
REACT_APP_HOURS_CLOSE_TICKETS_AUTO=24
```

## Production Deployment

The system uses PM2 for process management. Deployment process:

1. Pull latest code: `git pull`
2. Install dependencies: `npm install` (use `--force` if needed)
3. Build backend: `npm run build` (creates `dist/` folder)
4. Run migrations: `npx sequelize db:migrate` (run twice as per README)
5. Run seeds: `npx sequelize db:seed`
6. Restart PM2 process: `pm2 restart {instance}-backend`

Frontend deployment:
1. Build: `npm run build` (creates `build/` folder)
2. Restart: `pm2 restart {instance}-frontend`

## Key Integration Points

### WhatsApp Integration
- Uses Baileys library for WhatsApp Web protocol
- Sessions stored in database (Baileys table)
- QR code generation for connection setup
- Message sending via `SendWhatsAppMessage` and `SendWhatsAppMedia` services
- Incoming message handling via `wbotMessageListener`

### Campaign System
- Bulk messaging to contact lists
- Scheduled campaign dispatch
- Rate limiting via Bull queue configuration
- Campaign status tracking (pending/processing/canceled/finished)

### Queue/Chatbot System
- Multi-level queue options for automated routing
- Configurable greeting messages per WhatsApp connection
- Out-of-hours messaging support
- Queue-based ticket assignment

### Payment Integration
- Gerencianet/Efí integration for PIX payments
- Invoice generation and tracking
- Plan-based limits (users, connections)

## Important Notes

- Install dependencies with `--force` flag when needed due to peer dependency conflicts
- Database migrations should be run twice in production (as per deployment script)
- The system requires Node.js v20.x for compatibility
- Redis is required for queue processing and rate limiting
- Docker is used for Redis deployment
- Frontend uses legacy OpenSSL provider (`NODE_OPTIONS=--openssl-legacy-provider`) due to React Scripts 3.4.3
