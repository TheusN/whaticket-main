# Frontend Dockerfile - WhaTicket
# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar package.json
COPY package*.json ./

# Instalar dependências
RUN npm ci --force

# Copiar código fonte
COPY . .

# Build da aplicação
RUN npm run build

# Stage 2: Servir com nginx
FROM nginx:alpine

# Copiar build do stage anterior
COPY --from=builder /app/build /usr/share/nginx/html

# Copiar configuração do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor porta
EXPOSE 3003

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
