# Manual da Vida Moderna - Projeto Full Stack

Este é o repositório completo da landing page e do sistema de pagamento para o e-book "Manual da Vida Moderna" por Sérgio Dias Filho. O projeto é construído com uma arquitetura full-stack, separando o frontend da interface do usuário e o backend para processamento de pagamentos.

## 🏛️ Estrutura do Projeto

O projeto é um monorepo dividido em duas pastas principais:

- **/frontend**: Uma aplicação moderna em React (construída com Vite) que renderiza a landing page, o modal de compra e interage com o usuário.
- **/backend**: Uma API REST construída com Node.js e Express, responsável por se comunicar com o Mercado Pago para gerar e verificar pagamentos PIX.

## 🚀 Funcionalidades

### Frontend
- ✅ Landing page moderna e interativa com design responsivo.
- ✅ Animações de scroll para uma experiência de usuário mais dinâmica.
- ✅ Modal de pagamento integrado para uma experiência de checkout transparente.
- ✅ Geração de QR Code PIX em tempo real.
- ✅ Verificação automática do status do pagamento (polling) para liberar o download.
- ✅ Download direto do e-book em PDF após a confirmação do pagamento.

### Backend
- ✅ API REST com Node.js e Express para processamento de pagamentos.
- ✅ Integração segura com o SDK do Mercado Pago.
- ✅ Endpoint para criação de pagamentos PIX.
- ✅ Endpoint para consulta de status de pagamento.
- ✅ Endpoint de webhook para receber notificações do Mercado Pago (para futuras implementações, como envio de e-mail).

## 🛠️ Tecnologias

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Estilização**: Tailwind CSS
- **Ícones**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Pagamentos**: Mercado Pago SDK
- **Variáveis de Ambiente**: Dotenv

## 📦 Instalação

**Pré-requisitos:**
- Node.js (v18 ou superior)
- npm (ou yarn/pnpm)

### 1. Configurando o Backend

```bash
# 1. Navegue até a pasta do backend
cd backend

# 2. Crie um arquivo de variáveis de ambiente
# (Copie .env.example se existir, ou crie um novo)
touch .env

# 3. Adicione seu Access Token do Mercado Pago ao arquivo .env
# MERCADO_PAGO_ACCESS_TOKEN=SEU_TOKEN_AQUI

# 4. Instale as dependências
npm install

# 5. Inicie o servidor do backend
npm start
```
O servidor do backend estará rodando em `http://localhost:3001`.

### 2. Configurando o Frontend

```bash
# 1. Em um novo terminal, navegue até a pasta do frontend
cd frontend

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

4. Acesse no navegador: `http://localhost:5173`

## 🔧 Configuração de Ambiente (Frontend)

O frontend se conecta ao backend usando variáveis de ambiente para diferenciar os ambientes de desenvolvimento e produção.

1.  **Desenvolvimento**: O Vite usa um proxy (configurado em `vite.config.js`) para redirecionar as chamadas de API para `http://localhost:3001`. Nenhuma configuração adicional é necessária se o backend estiver rodando localmente.

2.  **Produção**: Para que o frontend em produção saiba onde encontrar a API, crie um arquivo chamado `.env.production` na raiz da pasta `/frontend`. Dentro dele, adicione a URL do seu backend na Render:

    ```dotenv
    # c:/Real_projects/manualVidaModerna_sergio/frontend/.env.production
    VITE_API_URL=https://manualvidamoderna-sergio.onrender.com
    ```

Isso garante que, ao executar `npm run build`, o código final aponte para a API correta em produção. Todas as chaves e links de pagamento são gerenciados dinamicamente pelo backend.

## 📱 Responsividade

O projeto é totalmente responsivo e foi testado para:
- 📱 Mobile (320px - 768px)
- 📱 Tablet (768px - 1024px)
- 💻 Desktop (1024px+)

## 🎨 Personalização

### Cores

As cores podem ser personalizadas no arquivo `tailwind.config.js`:

```javascript
colors: {
  amber: {
    // Suas cores personalizadas
  }
}
```

### Textos Bíblicos

Para adicionar ou modificar textos bíblicos, edite o arquivo `src/components/BibleVerseCarousel.jsx`:

```javascript
const bibleVerses = [
  {
    text: "Seu texto aqui",
    reference: "Livro X:Y"
  }
]
```

### Perfis do Instagram

Para adicionar ou modificar perfis, edite o arquivo `src/components/InstagramCarousel.jsx`:

```javascript
const instagramProfiles = [
  {
    username: "@usuario",
    name: "Nome",
    profileUrl: "https://instagram.com/usuario",
    image: "URL_DA_IMAGEM"
  }
]
```

## 📦 Build para Produção

Para criar uma build de produção:

```bash
npm run build
```

Os arquivos estarão na pasta `dist/`

## 🚀 Deploy

O projeto pode ser deployado em qualquer plataforma que suporte aplicações React:

- Vercel
- Netlify
- GitHub Pages
- AWS Amplify
- etc.

## 📄 Licença

© 2024 Sérgio Dias Filho & Yan Menephyl Works. Todos os direitos reservados.

## 👨‍💻 Desenvolvido por

**Yan Menephyl Works**
- Instagram: [@yan_menephyl_works](https://www.instagram.com/yan_menephyl_works/)
- Facebook: [Menephyl](https://www.facebook.com/menephyl.settings)
## 📞 Contato

**Sérgio Dias Filho**
- Instagram: [@sergiodiasfilho](https://www.instagram.com/sergiodiasfilho/)
