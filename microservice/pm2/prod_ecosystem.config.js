const commonEnv = require('./env_prod.common');

module.exports = {
  apps: [{
      name: 'syns-api-gateway',
      script: '../api-gateway/dist/main.js',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      autorestart: false,
      max_memory_restart: '8192M',
      env: {
        ...commonEnv,

      },
    },
    {
      name: 'sync-microservice-sync',
      script: '../microservice-sys/dist/main.js',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      autorestart: false,
      max_memory_restart: '8192M',
      env: {
        ...commonEnv,

      },
    },
  
  ]
};