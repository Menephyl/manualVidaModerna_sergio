require('dotenv').config(); // This line loads the .env file

const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const app = express();
app.use(express.json());

// Add a root route handler for health checks and developer experience
app.get('/', (req, res) => {
  res.status(200).send('✅ API server is running. It only handles requests under the /api path.');
});

const apiDir = path.join(__dirname, 'api');
const apiFiles = fs.readdirSync(apiDir).filter(file => file.endsWith('.js'));

for (const file of apiFiles) {
  const routeName = file.replace('.js', '');
  const route = `/api/${routeName}`;
  // Use file URL to ensure correct module resolution
  const modulePath = url.pathToFileURL(path.join(apiDir, file)).href;
  
  app.all(route, async (req, res) => {
    try {
      console.log(`[API Server] Handling request for: ${route}`);
      const { default: handler } = await import(modulePath);
      await handler(req, res);
    } catch (error) {
      console.error(`[API Server] Error handling request for ${route}:`, error);
      res.status(500).send('Internal Server Error');
    }
  });
}

const port = 3001;
http.createServer(app).listen(port, () => {
  console.log(`✅ API server is running and listening on http://localhost:${port}`);
  console.log('Registered API routes:', apiFiles.map(f => `/api/${f.replace('.js', '')}`).join(', '));
  // Log para confirmar que a variável de ambiente foi carregada
  const token = process.env.MP_ACCESS_TOKEN;
  console.log(`🔑 Mercado Pago Token Loaded: ${token ? `...${token.slice(-6)}` : 'NOT FOUND'}`);
});