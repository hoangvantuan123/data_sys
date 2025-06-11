module.exports = {
  apps: [{
    name: 'syns-api-gateway',
    script: 'dist/main.js',
    instances: 1,
    exec_mode: 'fork',
    watch: false,
    autorestart: false,
    max_memory_restart: '8192M',
    env: {
      HOST_GRPC_DATASYS: 'localhost:55550',
    },
  }],
};