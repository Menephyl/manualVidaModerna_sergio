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
