# Manual da Vida Moderna - Landing Page

Landing page moderna e interativa para o e-book "Manual da Vida Moderna" por Sérgio Dias Filho.

## 🚀 Funcionalidades

- ✅ Design artístico e teocrático com interatividade
- ✅ Carrossel interativo de textos bíblicos no header
- ✅ Carrossel de perfis do Instagram de leitores
- ✅ Botão flutuante de WhatsApp
- ✅ Modal de pagamento com opções PIX e Cartão de Crédito
- ✅ Scroll reveal animations em todas as seções
- ✅ Múltiplos CTAs (Call to Actions) estratégicos
- ✅ Footer completo com links de contato
- ✅ Totalmente responsivo para mobile, tablet e desktop
- ✅ Integração com Mercado Pago para pagamentos

## 🛠️ Tecnologias

- React 18.3.1
- Vite 5.4.2
- Tailwind CSS v4
- Lucide React (ícones)
- JavaScript/JSX

## 📦 Instalação

1. Clone o repositório ou baixe os arquivos
2. Instale as dependências:

```bash
npm install
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Acesse no navegador: `http://localhost:5173`

## 🔧 Configuração

### Atualizar QR Code PIX

1. Abra o arquivo `src/App.jsx`
2. Localize a linha com `qrCodeImage`
3. Substitua a URL do placeholder pela URL real do seu QR Code PIX

```javascript
const qrCodeImage = "URL_DO_SEU_QR_CODE_AQUI"
```

### Atualizar Código PIX

1. Abra o arquivo `src/App.jsx`
2. Localize a linha com `pixCode`
3. Substitua pelo código PIX real

```javascript
const pixCode = "SEU_CODIGO_PIX_AQUI"
```

### Atualizar Links de Pagamento

1. Abra o arquivo `src/App.jsx`
2. Atualize os links conforme necessário:

```javascript
const pixLink = "SEU_LINK_PIX_AQUI"
const mercadoPagoLink = "https://mpago.la/2XrXfQB" // Já configurado
```

### Atualizar Email

1. Abra o arquivo `src/App.jsx`
2. Localize `emailSergio` e atualize:

```javascript
const emailSergio = "seu-email@exemplo.com"
```

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

## 📞 Contato

**Sérgio Dias Filho**
- Instagram: [@sergiodiasfilho](https://www.instagram.com/sergiodiasfilho/)
- Facebook: [Menephyl](https://www.facebook.com/menephyl.settings)
- Email: contato@sergiodiasfilho.com
- WhatsApp: +55 44 9716-4827

 at   APP_USR-669226449513703-111713-49b0494ab65ff1b310aef6c8e1c6f8a0-284659356

 pk  APP_USR-648ecb8c-df09-436c-9c77-fc600b237c8c

PROMPT 
I need you to help me create an API using Node.js with Express using the MercadoPago SDK. I need an endpoint that returns the PIX code in base64 and the copy-and-paste code. It must follow Node.js best practices for building the API; the API should be inside the api folder and the front-end in the front folder.

After creating the API, you must integrate the created endpoint into my front-end inside the front folder, where we should ask the user only for the information required for the MercadoPago request to work. When the user clicks the submit button, we call the endpoint we created. If there is any error we must show feedback to the user; if everything goes well we must display the QR code using the base64 data as a local image (data:...), and also show the PIX copy-and-paste code alongside it.

We also need to implement a webhook endpoint to register with MercadoPago so that when MercadoPago identifies the payment it will call our webhook and an email will be sent to the customer who made the payment. Plan all the steps and ask me if I forgot any detail. Once you have all the answers, implement the two API endpoints (generate PIX and webhook) and also the front-end part. Don’t forget to send the webhook URL to MercadoPago using the notificationUrl; research the documentation online to understand how this works.
