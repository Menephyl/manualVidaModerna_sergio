# Guia de Deploy via EasyPanel (Método Automático)

Este guia utiliza a integração nativa do EasyPanel com o GitHub. Isso significa que você não precisa clonar arquivos manualmente na VPS. O EasyPanel baixará, construirá e atualizará seu site automaticamente a cada push no GitHub.

**Acesse seu painel:** `http://IP_DA_VPS:3000`

---

### 1. Criar o Projeto
1.  No EasyPanel, clique em **"Create Project"**.
2.  Nome: `Manual Vida Moderna`.

### 2. Configurar o Backend (API)
1.  Clique em **"+ Service"** e escolha **"App"**.
2.  Nome: `backend`.
3.  **Source (Origem):**
    *   **Repository:** `Menephyl/manualVidaModerna_sergio`
    *   **Branch:** `main` (ou master)
    *   **Root Directory (Diretório Raiz):** `backend` (Muito importante, pois é um monorepo).
4.  **Build (Construção):**
    *   O EasyPanel deve detectar automaticamente que é um projeto Node.js.
    *   Se precisar configurar manualmente:
        *   Build Command: `npm install`
        *   Start Command: `npm start`
5.  **Environment (Variáveis de Ambiente):**
    *   Adicione as seguintes chaves e valores:
        *   `NODE_ENV`: `production`
        *   `PORT`: `3001`
        *   `WEBHOOK_HOST`: `https://www.ordemdoseraphim.com`
        *   `MERCADO_PAGO_ACCESS_TOKEN`: `SEU_TOKEN_AQUI`
6.  **Network (Rede):**
    *   **Port:** `3001` (A porta que sua aplicação ouve).
    *   **Public Domain:** Você pode deixar vazio se não quiser expor a API diretamente, ou colocar `api.ordemdoseraphim.com`. Para nosso proxy funcionar, o EasyPanel cria uma rede interna.
7.  Clique em **"Create"** ou **"Deploy"**.

### 3. Configurar o Frontend (Site Estático)
1.  Clique em **"+ Service"** e escolha **"Static Website"** (conforme o link que você enviou).
2.  Nome: `frontend`.
3.  **Source (Origem):**
    *   **Repository:** `Menephyl/manualVidaModerna_sergio`
    *   **Branch:** `main`
    *   **Root Directory (Diretório Raiz):** `frontend`
4.  **Build (Construção):**
    *   **Build Command:** `npm install && npm run build`
    *   **Output Directory:** `dist` (Pasta onde o Vite gera os arquivos).
5.  **Domains (Domínios):**
    *   Adicione: `www.ordemdoseraphim.com` (Defina como principal).
    *   Adicione: `ordemdoseraphim.com` (Redirecionar para www).
6.  **Proxy Reverso (Para conectar com o Backend):**
    *   Vá na aba **"Advanced"** ou **"Nginx"** (depende da versão do EasyPanel).
    *   Procure por "Custom Nginx Configuration" ou "Proxy Locations".
    *   Você precisa criar uma regra que diga: "Tudo que for para `/api` envie para o serviço `backend`".
    *   No EasyPanel, isso geralmente é feito adicionando uma "Route" ou "Location":
        *   **Path:** `/api`
        *   **Target:** `http://backend:3001` (O nome do serviço backend que criamos).

### 4. Configurar DNS (Hostinger)
1.  No painel da Hostinger, crie dois registros tipo **A**:
    *   `@` apontando para o IP da sua VPS.
    *   `www` apontando para o IP da sua VPS.

---

**Observação:** Com este método, o arquivo `nginx-vps.conf` e `ecosystem.config.js` que criamos antes não são usados diretamente, pois o EasyPanel configura tudo internamente.
