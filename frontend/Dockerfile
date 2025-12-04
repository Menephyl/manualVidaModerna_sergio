# Estágio 1: Construir a aplicação React
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Estágio 2: Servir os arquivos estáticos com Nginx
FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Adiciona a configuração para Single-Page Applications (SPAs) como o React
COPY nginx.conf /etc/nginx/conf.d/default.conf