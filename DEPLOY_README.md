# Guia de Deploy para VPS Ubuntu (Hostinger) com EasyPanel

Este guia detalha os passos para hospedar a aplicação full-stack (React + Node.js) em uma única VPS Hostinger KVM1 com EasyPanel, utilizando as funcionalidades do painel para gerenciar Nginx, Node.js e SSL.

**Domínio Principal:** `https://www.ordemdoseraphim.com`

---

### Passo 1: Acessar e Preparar a VPS

1.  Conecte-se à sua VPS via SSH:
    *   Você pode usar um cliente SSH (como PuTTY no Windows, Terminal no macOS/Linux) ou o terminal SSH integrado no painel da Hostinger.
    ```bash
    ssh seu_usuario@ip_da_vps
    ```

2.  Atualize os pacotes do sistema:
    ```bash
    sudo apt update && sudo apt upgrade -y
    ```

### Passo 2: Clonar o Projeto na VPS

1.  **Instalar o Git (se não estiver instalado):**
    ```bash
    sudo apt install -y git
    ```

2.  **Clonar o repositório para um local acessível:**
    *   O EasyPanel geralmente usa `/var/www` ou diretórios internos, mas clonar manualmente permite controle total.
    ```bash
    # Crie o diretório /var/www se ele não existir
    sudo mkdir -p /var/www
    cd /var/www
    # Clone seu repositório. Substitua pela URL correta.
    sudo git clone https://github.com/seu-usuario/seu-repositorio.git ordemdoseraphim.com
    # Defina as permissões corretas
    sudo chown -R $USER:$USER ordemdoseraphim.com
    cd ordemdoseraphim.com
    ```

3.  **Instalar dependências do Backend e Frontend (via SSH):**
    ```bash
    # Backend
    cd backend
    npm install

    # Frontend
    cd ../frontend
    npm install
    cd ..
    ```

4.  **Buildar o Frontend (via SSH):**
    *   Isso criará a pasta `frontend/dist` com os arquivos estáticos.
    ```bash
    cd frontend
    npm run build
    cd ..
    ```

### Passo 3: Configurar o Backend no EasyPanel

1.  **Acesse o painel do EasyPanel** no seu navegador.
2.  Vá para a seção de **"Aplicativos"** ou **"Node.js Applications"**.
3.  Clique em **"Adicionar Novo Aplicativo"**.
4.  **Configurações do Aplicativo Node.js:**
    *   **Nome:** `ordem-seraphim-backend`
    *   **Caminho do Projeto:** `/var/www/ordemdoseraphim.com/backend` (ou configure para puxar do Git diretamente se preferir).
    *   **Arquivo de Entrada (Entry File):** `server.js`
    *   **Variáveis de Ambiente:** Adicione as seguintes:
        *   `NODE_ENV`: `production`
        *   `PORT`: `3001`
        *   `WEBHOOK_HOST`: `https://www.ordemdoseraphim.com`
        *   `MERCADO_PAGO_ACCESS_TOKEN`: `SEU_TOKEN_AQUI` (Copie do seu .env local ou painel do MP).
    *   **Comando de Inicialização:** `npm start`
5.  **Salve e Inicie o Aplicativo.**

### Passo 4: Configurar o Frontend (Site Estático) no EasyPanel

1.  Vá para a seção de **"Sites"** ou **"Static Sites"**.
2.  Clique em **"Adicionar Novo Site"**.
3.  **Configurações do Site Estático:**
    *   **Domínio:** `www.ordemdoseraphim.com`
    *   **Caminho Raiz (Root Directory):** `/var/www/ordemdoseraphim.com/frontend/dist`
    *   **SSL:** Habilite o SSL (Let's Encrypt).
    *   **Redirecionamento:** Habilite "Redirecionar `ordemdoseraphim.com` para `www.ordemdoseraphim.com`".
    *   **Proxy Reverso para API:**
        *   **Caminho (Path):** `/api`
        *   **Destino (Target):** Selecione o aplicativo Node.js `ordem-seraphim-backend` criado anteriormente.
4.  **Salve e Ative o Site.**

### Passo 5: Configurar Domínio (DNS na Hostinger)

1.  **Acesse o painel da Hostinger** e vá para as configurações de DNS do seu domínio `ordemdoseraphim.com`.
2.  Crie ou edite os registros `A`:
    *   **Host:** `@` -> **Aponta para:** `IP_DA_VPS`
    *   **Host:** `www` -> **Aponta para:** `IP_DA_VPS`

---

**Pronto!** Após a propagação do DNS, seu site estará acessível em `https://www.ordemdoseraphim.com`.
