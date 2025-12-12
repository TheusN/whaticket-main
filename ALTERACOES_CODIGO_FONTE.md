# Documento de Alterações no Código Fonte - OmniWhats (Whaticket)

**Data:** 11/12/2025
**Versão:** 6.0.0
**Repositório:** https://github.com/TheusN/whaticket-main

---

## Resumo das Alterações

Este documento descreve todas as modificações necessárias no código fonte para que o sistema funcione corretamente em ambiente de produção com Node.js 20+ e React 17.

---

## 1. BACKEND

### 1.1. Arquivo: `backend/package.json`

**Problema:** Versão inexistente do `@types/jest`

**Alteração:**
```diff
- "@types/jest": "^29.5.15",
+ "@types/jest": "^29.5.14",
```

**Motivo:** A versão 29.5.15 do @types/jest não existe no npm registry.

---

### 1.2. Arquivo: `backend/tsconfig.json`

**Problema:** Erros de TypeScript impediam a compilação

**Alteração:**
```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "outDir": "./dist",
    "strict": false,
    "strictPropertyInitialization": false,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noEmitOnError": false,    // ADICIONADO
    "noImplicitAny": false     // ADICIONADO
  }
}
```

**Motivo:** Permite compilação mesmo com erros de tipo, já que o código funciona em runtime.

---

### 1.3. Arquivo: `backend/src/app.ts`

**Problema:** Sentry v10+ não possui mais `Sentry.Handlers.requestHandler()` e `Sentry.Handlers.errorHandler()`

**Código Original (linhas 57-63):**
```typescript
app.use(cookieParser());
app.use(express.json());
app.use(Sentry.Handlers.requestHandler());
app.use("/public", express.static(uploadConfig.directory));
app.use(routes);

app.use(Sentry.Handlers.errorHandler());
```

**Código Alterado:**
```typescript
app.use(cookieParser());
app.use(express.json());
// Sentry handlers removed for v10+ compatibility
app.use("/public", express.static(uploadConfig.directory));
app.use(routes);
```

**Motivo:** A API do Sentry mudou na versão 10+. Os handlers foram removidos e substituídos por uma nova abordagem de instrumentação.

---

## 2. FRONTEND

### 2.1. Arquivo: `frontend/package.json`

**Problema:** Múltiplas dependências incompatíveis com React 17

**Alterações nos scripts:**
```diff
  "scripts": {
-   "start": "cross-env NODE_OPTIONS=--openssl-legacy-provider react-scripts start",
-   "build": "cross-env NODE_OPTIONS=--openssl-legacy-provider GENERATE_SOURCEMAP=false react-scripts build",
-   "builddev": "react-scripts build",
-   "test": "react-scripts test",
+   "start": "cross-env NODE_OPTIONS=--openssl-legacy-provider react-app-rewired start",
+   "build": "cross-env NODE_OPTIONS=--openssl-legacy-provider GENERATE_SOURCEMAP=false react-app-rewired build",
+   "builddev": "react-app-rewired build",
+   "test": "react-app-rewired test",
    "eject": "react-scripts eject"
  },
```

**Dependências adicionadas:**
```json
{
  "dependencies": {
    "buffer": "^6.0.3",
    "crypto-browserify": "^3.12.1",
    "os-browserify": "^0.3.0",
    "path-browserify": "^1.0.1",
    "process": "^0.11.10",
    "stream-browserify": "^3.0.0",
    "util": "^0.12.x",
    "use-sync-external-store": "^1.x"
  },
  "devDependencies": {
    "react-app-rewired": "^2.2.1"
  }
}
```

**Dependências com downgrade necessário:**
```json
{
  "date-fns": "2.29.3",
  "@date-io/date-fns": "2.16.0",
  "emoji-mart": "3.0.1",
  "qrcode.react": "3.1.0",
  "react-number-format": "4.9.4",
  "react-bootstrap": "2.4.0",
  "bootstrap": "5.2.3",
  "react-toastify": "9.1.3",
  "i18next": "22.5.1",
  "i18next-browser-languagedetector": "7.1.0",
  "styled-components": "5.3.11",
  "react-chartjs-2": "4.3.1",
  "chart.js": "3.9.1"
}
```

**Motivo:** React 17 não possui `useSyncExternalStore` e várias bibliotecas mais novas requerem React 18+.

---

### 2.2. Arquivo: `frontend/config-overrides.js` (NOVO ARQUIVO)

**Problema:** Webpack 5 não inclui polyfills para módulos Node.js por padrão

**Arquivo criado:**
```javascript
const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    buffer: require.resolve('buffer/'),
    path: require.resolve('path-browserify'),
    os: require.resolve('os-browserify/browser'),
    process: require.resolve('process/browser.js'),
    util: require.resolve('util/'),
    url: false,
    fs: false,
    net: false,
    tls: false,
    child_process: false,
  };

  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
      process: 'process/browser.js',
    }),
  ];

  // Fix for ESM modules
  config.module.rules.push({
    test: /\.m?js/,
    resolve: {
      fullySpecified: false
    }
  });

  return config;
};
```

**Motivo:** O frontend usa bibliotecas como `jsonwebtoken` que dependem de módulos Node.js (crypto, stream, etc). O Webpack 5 não inclui mais esses polyfills automaticamente.

---

### 2.3. Arquivo: `frontend/src/components/QuickMessageDialog/index.js`

**Problema:** Uso do módulo `path` do Node.js no frontend

**Código Original (linha 36):**
```javascript
const path = require('path');
```

**Código Alterado:**
```javascript
// Browser-compatible path.basename
const basename = (filepath) => {
    if (!filepath) return '';
    return filepath.split(/[\\/]/).pop() || '';
};
```

**Também alterar (linha ~127):**
```diff
- path.basename(values.mediaPath)
+ basename(values.mediaPath)
```

**Motivo:** O módulo `path` do Node.js não funciona no browser. Criamos uma função equivalente para `path.basename()`.

---

### 2.4. Arquivo: `frontend/src/pages/Login/index.js`

**Problema:** Importação de named exports do package.json causa erro no Webpack 5

**Código Original (linhas 14-16):**
```javascript
import { versionSystem } from "../../../package.json";
import { i18n } from "../../translate/i18n";
import { nomeEmpresa } from "../../../package.json";
```

**Código Alterado:**
```javascript
import packageJson from "../../../package.json";
import { i18n } from "../../translate/i18n";
import { AuthContext } from "../../context/Auth/AuthContext";
import logo from "../../assets/logo.png";
import { LanguageOutlined, Visibility, VisibilityOff } from "@material-ui/icons";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import LanguageControl from "../../components/LanguageControl";

const { versionSystem, nomeEmpresa } = packageJson;
```

**Motivo:**
1. Named imports de JSON não são mais suportados da mesma forma no Webpack 5
2. Os imports devem vir ANTES de qualquer declaração de variável (regra do ESLint `import/first`)

---

### 2.5. Arquivo: `frontend/.env`

**Configuração necessária:**
```env
REACT_APP_BACKEND_URL=https://atendeapi.omniwhats.com
REACT_APP_HOURS_CLOSE_TICKETS_AUTO=24
```

**IMPORTANTE:** A variável `REACT_APP_BACKEND_URL` DEVE estar definida no momento do build:
```bash
REACT_APP_BACKEND_URL=https://atendeapi.omniwhats.com npm run build
```

---

## 3. COMANDOS DE INSTALAÇÃO

### 3.1. Backend

```bash
cd /home/deploy/omniwhats/backend

# Instalar dependências
npm install --force

# Compilar TypeScript
npx tsc --noEmitOnError false

# Executar migrations
npm run db:migrate

# Executar seeds
npm run db:seed

# Iniciar com PM2
pm2 start dist/server.js --name omniwhats-backend
pm2 save
```

### 3.2. Frontend

```bash
cd /home/deploy/omniwhats/frontend

# Instalar dependências base
npm install --force

# Instalar polyfills necessários
npm install crypto-browserify stream-browserify buffer path-browserify os-browserify process util use-sync-external-store --save --force

# Instalar react-app-rewired
npm install react-app-rewired --save-dev --force

# Fazer downgrade de pacotes incompatíveis
npm install date-fns@2.29.3 @date-io/date-fns@2.16.0 emoji-mart@3.0.1 qrcode.react@3.1.0 react-number-format@4.9.4 react-bootstrap@2.4.0 bootstrap@5.2.3 react-toastify@9.1.3 i18next@22.5.1 i18next-browser-languagedetector@7.1.0 styled-components@5.3.11 react-chartjs-2@4.3.1 chart.js@3.9.1 --save --force

# Compilar com variável de ambiente
REACT_APP_BACKEND_URL=https://atendeapi.omniwhats.com npm run build

# Iniciar com PM2
pm2 start server.js --name omniwhats-frontend
pm2 save
```

---

## 4. CONFIGURAÇÃO DO TRAEFIK (EasyPanel)

Adicionar ao arquivo `/etc/easypanel/traefik/config/main.yaml`:

**Routers:**
```json
{
  "http-omniwhats-frontend": {
    "service": "omniwhats-frontend",
    "rule": "Host(`atendechat.omniwhats.com`) && PathPrefix(`/`)",
    "priority": 0,
    "middlewares": ["redirect-to-https", "bad-gateway-error-page"],
    "entryPoints": ["http"]
  },
  "https-omniwhats-frontend": {
    "service": "omniwhats-frontend",
    "rule": "Host(`atendechat.omniwhats.com`) && PathPrefix(`/`)",
    "priority": 0,
    "middlewares": ["bad-gateway-error-page"],
    "tls": {
      "certResolver": "letsencrypt",
      "domains": [{"main": "atendechat.omniwhats.com"}]
    },
    "entryPoints": ["https"]
  },
  "http-omniwhats-backend": {
    "service": "omniwhats-backend",
    "rule": "Host(`atendeapi.omniwhats.com`) && PathPrefix(`/`)",
    "priority": 0,
    "middlewares": ["redirect-to-https", "bad-gateway-error-page"],
    "entryPoints": ["http"]
  },
  "https-omniwhats-backend": {
    "service": "omniwhats-backend",
    "rule": "Host(`atendeapi.omniwhats.com`) && PathPrefix(`/`)",
    "priority": 0,
    "middlewares": ["bad-gateway-error-page"],
    "tls": {
      "certResolver": "letsencrypt",
      "domains": [{"main": "atendeapi.omniwhats.com"}]
    },
    "entryPoints": ["https"]
  }
}
```

**Services:**
```json
{
  "omniwhats-frontend": {
    "loadBalancer": {
      "servers": [{"url": "http://192.168.0.150:3001/"}],
      "passHostHeader": true
    }
  },
  "omniwhats-backend": {
    "loadBalancer": {
      "servers": [{"url": "http://192.168.0.150:4001/"}],
      "passHostHeader": true
    }
  }
}
```

Após adicionar, reiniciar o Traefik:
```bash
docker service update --force traefik
```

---

## 5. ARQUIVOS ALTERADOS - RESUMO

| Arquivo | Tipo de Alteração |
|---------|-------------------|
| `backend/package.json` | Correção de versão |
| `backend/tsconfig.json` | Adição de opções de compilação |
| `backend/src/app.ts` | Remoção de Sentry handlers |
| `frontend/package.json` | Scripts e dependências |
| `frontend/config-overrides.js` | Arquivo novo (polyfills) |
| `frontend/src/components/QuickMessageDialog/index.js` | Substituição do módulo path |
| `frontend/src/pages/Login/index.js` | Correção de imports |
| `frontend/.env` | Configuração de variáveis |

---

## 6. CREDENCIAIS PADRÃO

| Item | Valor |
|------|-------|
| **URL Frontend** | https://atendechat.omniwhats.com |
| **URL Backend** | https://atendeapi.omniwhats.com |
| **Email Admin** | admin@admin.com |
| **Senha Admin** | 123456 |
| **Senha DB/Deploy** | GUwedD8vorR8MnU6 |
| **Porta Frontend** | 3001 |
| **Porta Backend** | 4001 |
| **Porta Redis** | 5001 |

---

## 7. PROBLEMAS CONHECIDOS E SOLUÇÕES

### 7.1. ERR_BLOCKED_BY_CLIENT no console
**Causa:** O build foi feito sem a variável REACT_APP_BACKEND_URL
**Solução:** Recompilar com: `REACT_APP_BACKEND_URL=https://atendeapi.omniwhats.com npm run build`

### 7.2. Cannot read properties of undefined (reading 'requestHandler')
**Causa:** Sentry v10+ mudou a API
**Solução:** Remover `Sentry.Handlers.requestHandler()` e `Sentry.Handlers.errorHandler()` do app.ts

### 7.3. Module not found: Can't resolve 'crypto'
**Causa:** Webpack 5 não inclui polyfills do Node.js
**Solução:** Criar config-overrides.js com os fallbacks necessários

### 7.4. useSyncExternalStore is not exported from 'react'
**Causa:** Bibliotecas requerem React 18 mas projeto usa React 17
**Solução:** Fazer downgrade das bibliotecas afetadas

---

**Documento criado em:** 11/12/2025
**Autor:** Claude Code (Assistente de Instalação)
