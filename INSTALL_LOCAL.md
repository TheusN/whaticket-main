# Instalação Local - Whaticket

Este guia mostra como instalar o Whaticket localmente para desenvolvimento sem afetar a configuração de produção.

## Pré-requisitos

- Node.js v20.x
- Docker e Docker Compose
- Git

## Passo 1: Subir PostgreSQL e Redis com Docker

Na raiz do projeto, execute:

```bash
docker-compose -f docker-compose.local.yml up -d
```

Isso criará:
- PostgreSQL na porta 5432 (usuário: `whaticket_local`, senha: `whaticket123`, database: `whaticket_local`)
- Redis na porta 6379 (senha: `redis123`)

Para verificar se estão rodando:
```bash
docker-compose -f docker-compose.local.yml ps
```

## Passo 2: Configurar Backend

1. Copie o arquivo de exemplo e configure:
```bash
cd backend
copy .env.local.example .env
```

2. Edite o arquivo `backend\.env` com suas configurações:
```env
NODE_ENV=development
BACKEND_URL=http://localhost:8080
FRONTEND_URL=http://localhost:3000
PORT=8080

DB_DIALECT=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USER=whaticket_local
DB_PASS=whaticket123
DB_NAME=whaticket_local

JWT_SECRET=meu_jwt_secret_local_12345
JWT_REFRESH_SECRET=meu_jwt_refresh_secret_local_67890

REDIS_URI=redis://:redis123@127.0.0.1:6379
REDIS_OPT_LIMITER_MAX=1
REGIS_OPT_LIMITER_DURATION=3000

USER_LIMIT=10
CONNECTIONS_LIMIT=3
CLOSED_SEND_BY_ME=true
```

3. Instale dependências e execute migrações:
```bash
npm install --force
npm run build
npx sequelize db:migrate
npx sequelize db:seed:all
```

## Passo 3: Configurar Frontend

1. Copie o arquivo de exemplo:
```bash
cd ..\frontend
copy .env.local.example .env
```

2. O arquivo já deve conter:
```env
REACT_APP_BACKEND_URL=http://localhost:8080
REACT_APP_HOURS_CLOSE_TICKETS_AUTO=24
```

3. Instale dependências:
```bash
npm install --force
```

## Passo 4: Iniciar o Sistema

### Backend (2 terminais necessários)

Terminal 1 - Compilar TypeScript em modo watch:
```bash
cd backend
npm run watch
```

Terminal 2 - Executar o servidor:
```bash
cd backend
npm start
```

Ou em desenvolvimento com auto-reload:
```bash
cd backend
npm run dev:server
```

### Frontend

Terminal 3:
```bash
cd frontend
npm start
```

O sistema estará disponível em:
- Frontend: http://localhost:3000
- Backend: http://localhost:8080

## Credenciais Padrão

Após os seeds, você pode fazer login com:
- **Email**: Verifique o seed em `backend/src/database/seeds/`
- **Senha**: Verifique o seed em `backend/src/database/seeds/`

## Comandos Úteis

### Parar os containers Docker
```bash
docker-compose -f docker-compose.local.yml stop
```

### Reiniciar os containers Docker
```bash
docker-compose -f docker-compose.local.yml restart
```

### Ver logs dos containers
```bash
docker-compose -f docker-compose.local.yml logs -f
```

### Remover tudo (CUIDADO: apaga dados)
```bash
docker-compose -f docker-compose.local.yml down -v
```

### Resetar banco de dados
```bash
cd backend
npx sequelize db:migrate:undo:all
npx sequelize db:migrate
npx sequelize db:seed:all
```

## Desenvolvimento

### Executar migrações
```bash
cd backend
npx sequelize db:migrate
```

### Criar nova migração
```bash
cd backend
npx sequelize migration:create --name nome-da-migracao
```

### Executar testes
```bash
cd backend
npm test
```

### Lint do código
```bash
cd backend
npm run lint
```

## Notas Importantes

- Os arquivos `.env` estão no `.gitignore` e não serão commitados
- Use `docker-compose.local.yml` para desenvolvimento, nunca modifique configurações de produção
- Para produção, use as instruções do README.md principal
- O frontend usa `NODE_OPTIONS=--openssl-legacy-provider` devido ao React Scripts 3.4.3
- Sempre use `npm install --force` devido a conflitos de peer dependencies

## Troubleshooting

### Erro de conexão com banco de dados
Verifique se o PostgreSQL está rodando:
```bash
docker-compose -f docker-compose.local.yml ps
```

### Erro de conexão com Redis
Verifique se o Redis está rodando e a senha está correta no `.env`

### Porta já em uso
Se as portas 3000, 8080, 5432 ou 6379 já estiverem em uso, modifique as portas no `docker-compose.local.yml` e nos arquivos `.env`

### Erro ao instalar dependências
Use sempre `npm install --force` devido aos conflitos de peer dependencies
