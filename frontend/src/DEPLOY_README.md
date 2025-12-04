# Guia de Deploy para VPS Ubuntu (Hostinger)

Este guia detalha os passos para hospedar a aplicação full-stack (React + Node.js) em uma única VPS, usando Nginx como proxy reverso e PM2 para gerenciar o processo do backend.

**Domínio Principal:** `www.ordemdoseraphim.com`

---

### Passo 1: Acessar e Preparar a VPS

1.  Conecte-se à sua VPS via SSH:
    ```bash
    ssh seu_usuario@ip_da_vps
    ```

2.  Atualize os pacotes do sistema:
    ```bash
    sudo apt update && sudo apt upgrade -y
    ```

### Passo 2: Instalar Dependências (Node.js, Nginx, PM2)

1.  **Instalar Node.js v18 (LTS):**
    ```bash
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt install -y nodejs
    ```

2.  **Instalar Nginx:**
    ```bash
    sudo apt install -y nginx
    ```

3.  **Instalar PM2 globalmente:**
    ```bash
    sudo npm install pm2 -g
    ```

### Passo 3: Clonar e Configurar o Projeto

1.  **Instalar o Git (se não estiver instalado):**
    ```bash
    sudo apt install -y git
    ```

2.  **Clonar o repositório:**
    ```bash
    # Crie o diretório /var/www se ele não existir
    sudo mkdir -p /var/www
    cd /var/www
    sudo git clone https://github.com/seu-usuario/seu-repositorio.git ordemdoseraphim.com
    sudo chown -R $USER:$USER ordemdoseraphim.com
    cd ordemdoseraphim.com
    ```
    *Substitua `https://github.com/seu-usuario/seu-repositorio.git` pela URL do seu repositório.*

3.  **Instalar dependências do Backend e Frontend:**
    ```bash
    # Backend
    cd backend
    npm install

    # Frontend
    cd ../frontend
    npm install
    cd ..
    ```

4.  **Configurar Variáveis de Ambiente do Backend:**
    Crie o arquivo `.env` para o backend e adicione seu token do Mercado Pago.
    ```bash
    echo "MERCADO_PAGO_ACCESS_TOKEN=SEU_TOKEN_AQUI" > backend/.env
    ```

5.  **Buildar o Frontend:**
    Os arquivos estáticos serão gerados na pasta `frontend/dist`.
    ```bash
    cd frontend
    npm run build
    cd ..
    ```

### Passo 4: Configurar Nginx e Ativar o Site

1.  **Copiar a configuração do Nginx:**
    Use o arquivo `nginx-vps.conf` do repositório como base.
    ```bash
    sudo cp nginx-vps.conf /etc/nginx/sites-available/ordemdoseraphim.com
    ```

2.  **Ativar a configuração:**
    ```bash
    sudo ln -s /etc/nginx/sites-available/ordemdoseraphim.com /etc/nginx/sites-enabled/
    ```

3.  **Testar e reiniciar o Nginx:**
    ```bash
    sudo nginx -t
    sudo systemctl restart nginx
    ```

### Passo 5: Iniciar o Backend com PM2

1.  **Iniciar a aplicação:**
    Na raiz do projeto (`/var/www/ordemdoseraphim.com`), execute:
    ```bash
    pm2 start ecosystem.config.js --env production
    ```

2.  **Configurar PM2 para iniciar com o sistema:**
    ```bash
    pm2 startup
    # Siga as instruções que o comando acima irá fornecer (geralmente é um comando para copiar e colar)
    pm2 save
    ```

### Passo 6: Configurar Domínio e SSL (Certbot)

1.  **Apontar o DNS:**
    No painel da Hostinger, crie um registro `A` para `ordemdoseraphim.com` e `www.ordemdoseraphim.com` apontando para o `ip_da_sua_vps`.

2.  **Instalar o Certbot:**
    ```bash
    sudo apt install -y certbot python3-certbot-nginx
    ```

3.  **Gerar o Certificado SSL:**
    O Certbot irá detectar sua configuração no Nginx e configurar o HTTPS automaticamente.
    ```bash
    sudo certbot --nginx -d ordemdoseraphim.com -d www.ordemdoseraphim.com
    ```
    *Siga as instruções, forneça seu e-mail e concorde em redirecionar o tráfego HTTP para HTTPS.*

---

**Pronto!** Seu site deve estar no ar e acessível via `https://www.ordemdoseraphim.com`.

**Comandos úteis do PM2:**
- `pm2 list`: Lista todos os processos.
- `pm2 logs`: Mostra os logs da aplicação em tempo real.
- `pm2 restart all`: Reinicia todas as aplicações.