# ✅ Sistema Whaticket - Rodando Localmente

## 🎉 Instalação Concluída com Sucesso!

O sistema Whaticket foi instalado e está rodando no seu computador.

---

## 🌐 URLs de Acesso

| Serviço | URL | Status |
|---------|-----|--------|
| **Frontend** | http://localhost:3003 | ✅ Rodando |
| **Backend API** | http://localhost:8080 | ✅ Rodando |
| **PostgreSQL** | localhost:5432 | ✅ Rodando (Docker) |
| **Redis** | localhost:6379 | ✅ Rodando (Docker) |

---

## 🔑 Credenciais Padrão

As credenciais foram criadas pelos seeds do banco de dados. Verifique em:
`backend/src/database/seeds/20200904070006-create-default-user.ts`

Normalmente:
- **Email**: admin@admin.com (verifique no seed)
- **Senha**: admin (verifique no seed)

---

## 📂 Arquivos de Configuração

### Backend
- `backend/.env` - Configurações do servidor
- `backend/dist/` - Código compilado

### Frontend
- `frontend/.env` - Configuração base
- `frontend/.env.local` - Configuração local (porta 3003)

### Docker
- `docker-compose.local.yml` - PostgreSQL e Redis

---

## 🔄 Comandos Úteis

### Parar os Servidores

```bash
# Parar todos os processos Node
# Pressione Ctrl+C nos terminais onde estão rodando

# Parar containers Docker
docker-compose -f docker-compose.local.yml stop
```

### Reiniciar os Servidores

```bash
# Backend (em um terminal)
cd backend
npm start

# Frontend (em outro terminal)
cd frontend
npm start
```

### Verificar Logs do Backend

```bash
# Os logs aparecem no terminal onde o backend está rodando
# Ou verifique os logs do Docker:
docker-compose -f docker-compose.local.yml logs -f
```

### Resetar Banco de Dados

```bash
cd backend
npx sequelize db:migrate:undo:all
npx sequelize db:migrate
npx sequelize db:seed:all
```

---

## 🛠️ Troubleshooting

### Frontend não abre no navegador

Aguarde 2-3 minutos para compilação completa, então acesse manualmente:
http://localhost:3003

### Erro de conexão com banco

Verifique se os containers Docker estão rodando:
```bash
docker ps --filter name=whaticket
```

Se não estiverem, inicie com:
```bash
docker-compose -f docker-compose.local.yml up -d
```

### Erro no Backend

Verifique os logs do backend no terminal onde está rodando.
Certifique-se de que PostgreSQL e Redis estão acessíveis.

### Porta já em uso

Se a porta 3003 já estiver em uso, edite `frontend/.env.local` e mude para outra porta (ex: 3004)

---

## 📚 Documentação

- **[CLAUDE.md](CLAUDE.md)** - Arquitetura e comandos do projeto
- **[INSTALL_LOCAL.md](INSTALL_LOCAL.md)** - Guia completo de instalação
- **[README.md](README.md)** - Documentação original do projeto

---

## ⚡ Próximos Passos

1. Acesse http://localhost:3003
2. Faça login com as credenciais padrão
3. Configure sua primeira conexão WhatsApp
4. Comece a usar o sistema!

---

## 🎯 Containers Docker Ativos

```
whaticket-postgres-local   -  PostgreSQL Database
whaticket-redis-local      -  Redis Cache/Queue
```

---

**Sistema instalado em**: 07/10/2025
**Versão**: 6.0.0
