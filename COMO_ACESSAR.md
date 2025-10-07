# 🎯 Como Acessar o Whaticket - GUIA RÁPIDO

## ✅ Status Atual

- ✅ **Backend**: RODANDO na porta 8080
- ⏳ **Frontend**: COMPILANDO (pode demorar 5-10 minutos)
- ✅ **PostgreSQL**: RODANDO (Docker)
- ✅ **Redis**: RODANDO (Docker)

---

## 🚀 OPÇÃO 1: Testar o Backend Agora

1. Abra o arquivo: **[test-backend.html](test-backend.html)**
2. Clique em "Testar Backend"
3. Se aparecer "✅ Backend está rodando", tudo está OK!

---

## 🌐 OPÇÃO 2: Acessar o Sistema Completo

### Aguarde a Compilação do Frontend

O frontend React está compilando. Isso pode demorar **5-10 minutos** na primeira vez.

Aguarde e então acesse:

```
http://localhost:3003
```

### Credenciais de Login

```
Email: admin@admin.com
Senha: 123456
```

---

## ⚡ OPÇÃO 3: Reiniciar Tudo (Se Não Funcionar)

Se após 10 minutos ainda não funcionar, siga estes passos:

### 1. Parar Todos os Processos

Pressione `Ctrl+C` em todos os terminais que estão rodando o sistema.

Ou feche todas as janelas do terminal.

### 2. Matar Processos Node

Abra o PowerShell como Administrador e execute:

```powershell
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
```

### 3. Iniciar Backend

Abra um terminal e execute:

```bash
cd backend
npm start
```

Aguarde ver a mensagem: `Server started on port: 8080`

### 4. Iniciar Frontend (EM OUTRO TERMINAL)

Abra **outro terminal** e execute:

```bash
cd frontend
npm start
```

Aguarde **5-10 minutos** para compilar.

O navegador deve abrir automaticamente em `http://localhost:3003`

---

## 🔍 Verificar se está Funcionando

### Testar Backend

Abra o navegador e acesse:
```
http://localhost:8080
```

Deve mostrar uma página (pode ser erro 404, mas isso significa que está rodando)

### Testar Frontend

Abra o navegador e acesse:
```
http://localhost:3003
```

Deve aparecer a tela de login do Whaticket

---

## 📱 Após Fazer Login

1. Vá em **Conexões** no menu lateral
2. Clique em **Adicionar WhatsApp**
3. Escanei o QR Code com seu WhatsApp
4. Comece a usar o sistema!

---

## ❓ Problemas Comuns

### "Cannot connect to localhost:8080"

Backend não está rodando. Inicie com:
```bash
cd backend
npm start
```

### "Cannot connect to localhost:3003"

Frontend ainda está compilando. Aguarde mais alguns minutos.

### "Port 3003 is already in use"

Outra aplicação está usando a porta. Edite `frontend/.env.local` e mude para:
```
PORT=3004
```

Então reinicie o frontend.

### Frontend trava em "Starting the development server..."

Isso é normal! A compilação inicial do React é MUITO lenta (5-10 minutos).

Seja paciente e aguarde. Quando terminar, o navegador abrirá automaticamente.

---

## 📞 Suporte

- Documentação técnica: **[CLAUDE.md](CLAUDE.md)**
- Guia de instalação: **[INSTALL_LOCAL.md](INSTALL_LOCAL.md)**
- Status do sistema: **[SISTEMA_RODANDO.md](SISTEMA_RODANDO.md)**

---

## ✨ Pronto!

Após o frontend compilar e você fazer login, o sistema estará 100% funcional!
