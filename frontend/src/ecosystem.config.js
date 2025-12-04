module.exports = {
  apps: [
    {
      name: 'ordem-seraphim-backend',
      script: './backend/server.js',
      instances: 'max', // Roda uma instância por núcleo de CPU
      exec_mode: 'cluster', // Habilita o modo cluster do Node.js
      autorestart: true, // Reinicia automaticamente em caso de falha
      watch: false, // Desabilitado em produção para performance
      max_memory_restart: '1G', // Reinicia se usar mais de 1GB de RAM
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001,
        WEBHOOK_HOST: 'https://www.ordemdoseraphim.com',
        // IMPORTANTE: Você precisará definir a variável MERCADO_PAGO_ACCESS_TOKEN
        // diretamente no ambiente da sua VPS ou aqui.
        // Ex: MERCADO_PAGO_ACCESS_TOKEN: 'SEU_TOKEN_AQUI'
      },
    },
  ],
};