module.exports = {
  apps: [
    {
      name: 'ordem-seraphim-backend',
      script: './backend/server.js',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env_production: {
        NODE_ENV: 'production',
        PORT: 3001,
        WEBHOOK_HOST: 'https://www.ordemdoseraphim.com',
        // MERCADO_PAGO_ACCESS_TOKEN must be set in the environment
      },
    },
  ],
};
