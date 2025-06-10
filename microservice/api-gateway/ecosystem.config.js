module.exports = {
  apps: [{
    name: 'api-gateway',
    script: 'dist/main.js',
    instances: 1, // Giữ 1 instance để dễ debug (hoặc đổi thành 'max' nếu muốn scale)
    exec_mode: 'fork', // Chạy ở chế độ fork (hoặc 'cluster' nếu muốn scale)
    watch: false, // Không theo dõi file thay đổi để tránh restart liên tục
    max_memory_restart: '2G', // Tự restart khi dùng quá 2GB RAM
    restart_delay: 5000, // Đợi 5 giây trước khi restart
    autorestart: true, // Luôn tự động restart nếu có lỗi
    env: {
      NODE_ENV: 'production',
      PORT: 8386,
      NODE_OPTIONS: '--max-old-space-size=2048',
      HOST_REDIS_USER: '103.20.96.101',
      HOST_REDIS_BASIC: '103.20.96.101',
      HOST_REDIS_PRODUCE: '103.20.96.101'
    },
    error_file: './logs/error.log', // Ghi lỗi vào file log
    out_file: './logs/output.log', // Ghi output ra file
    log_date_format: 'YYYY-MM-DD HH:mm Z',
  }],
};