# 🚀 Atendechat v6.0

Sistema completo de atendimento via WhatsApp com múltiplos atendentes, filas, automação e muito mais.

---

## ⚡ INÍCIO RÁPIDO

### Windows (Recomendado):

1. **Execute o instalador:**
   ```
   Clique duas vezes em: INICIAR_SISTEMA.bat
   ```

2. **Aguarde:**
   - Docker iniciará automaticamente
   - Backend abrirá em nova janela (porta 8080)
   - Frontend abrirá em nova janela (porta 3003)
   - Navegador abrirá automaticamente

3. **Login:**
   ```
   URL: http://localhost:3003
   Email: admin@admin.com
   Senha: 123456
   ```

**Pronto!** Sistema funcionando.

---

## 📚 Documentação

- **[CLAUDE.md](CLAUDE.md)** - Documentação técnica completa do sistema
- **[REDESIGN-2025.md](REDESIGN-2025.md)** - Guia de redesign e modernização

---

## 🎯 Estrutura do Projeto

```
whaticket-main/
├── backend/          # API Node.js + Express + TypeScript
├── frontend/         # React.js + Material-UI
├── docker-compose.local.yml  # PostgreSQL + Redis
├── INICIAR_SISTEMA.bat      # Inicializador completo
└── README.md         # Este arquivo
```

---

## 📋 Pré-requisitos

**Apenas 3 programas necessários:**

1. **Node.js v20+** - https://nodejs.org
2. **Docker Desktop** - https://www.docker.com/products/docker-desktop
3. **Git** (opcional) - https://git-scm.com

> O script `INICIAR_SISTEMA.bat` verifica tudo automaticamente!

---

## 🔧 Instalação Manual (Avançado)

Se preferir instalar manualmente sem usar o `.bat`:

### 1. Instalar dependências:
```bash
cd backend
npm install --force

cd ../frontend
npm install --force
```

### 2. Iniciar Docker:
```bash
docker-compose -f docker-compose.local.yml up -d
```

### 3. Iniciar Backend:
```bash
cd backend
npm start
```

### 4. Iniciar Frontend (nova janela):
```bash
cd frontend
npm start
```

---

## 🌐 URLs e Portas

| Serviço | Porta | URL |
|---------|-------|-----|
| Frontend | 3003 | http://localhost:3003 |
| Backend | 8080 | http://localhost:8080 |
| PostgreSQL | 5432 | localhost:5432 |
| Redis | 6379 | localhost:6379 |

---

## 🔑 Credenciais Padrão

```
Email: admin@admin.com
Senha: 123456
```

**⚠️ IMPORTANTE:** Troque a senha após primeiro login!

---

## 🛠️ Stack Tecnológica

### Backend:
- **Node.js** v20+ + **TypeScript**
- **Express.js** - Framework web
- **Sequelize** - ORM (PostgreSQL)
- **Socket.io** - Real-time
- **Bull** - Queue system
- **Baileys** - WhatsApp Web API
- **JWT** - Autenticação

### Frontend:
- **React** 17 + **TypeScript**
- **Material-UI** v4 - Components
- **Socket.io-client** - Real-time
- **Axios** - HTTP client
- **Formik** + **Yup** - Forms
- **i18next** - Internacionalização

### Infraestrutura:
- **PostgreSQL** 13 - Database
- **Redis** 7 - Cache/Queue
- **Docker** - Containerização

---

## 🐛 Troubleshooting

### Docker não inicia:
```
Solução: Abra o Docker Desktop manualmente
```

### Frontend não compila:
```
Aguarde 5-10 minutos. É normal na primeira vez.
```

### Backend com erro:
```
Verifique se Docker está rodando:
docker ps

Deve mostrar: postgres e redis
```

### Porta já em uso:
```
Altere as portas nos arquivos .env (backend e frontend)
```

---

## 📞 Suporte

- **Documentação Técnica:** [CLAUDE.md](CLAUDE.md)
- **Guia de Redesign:** [REDESIGN-2025.md](REDESIGN-2025.md)

---

## 📌 Versão

**v6.0.0** - Dezembro 2025

---

## 📄 Licença

Todos os direitos reservados © [Atendechat](https://atendechat.com)

---

**Desenvolvido com ❤️ pela equipe Atendechat**
