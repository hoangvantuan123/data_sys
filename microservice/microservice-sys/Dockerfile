# Giai đoạn 1: Build
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy tất cả các tệp còn lại và build
COPY . .
RUN yarn run build && \
    yarn cache clean && \
    rm -rf /root/.cache /app/node_modules

# Giai đoạn 2: Production
FROM node:20-alpine

WORKDIR /app

COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile --production && \
    yarn cache clean

COPY --from=build /app/dist ./dist
# Thiết lập biến môi trường mặc định
ENV NODE_ENV=production 
ENV HOST_REDIS=redis-basic
ENV REDIS_PORT=6380

# Chạy ứng dụng dưới dạng microservice (NestJS)
CMD ["node", "dist/main.js"]
