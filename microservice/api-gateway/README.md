# Redis cho AUTH_SERVICE trên cổng 6379
docker run -d --name redis-auth -p 6379:6379 redis:latest

# Redis cho BASIC_SERVICE trên cổng 6380
docker run -d --name redis-basic -p 6380:6379 redis:latest



docker-compose up -d
docker stats 24413b0fbfe3



HOST_REDIS_USER=localhost
HOST_REDIS_BASIC=localhost
HOST_REDIS_PRODUCE=localhost
SQL_SERVER_HOST=localhost



# gRPC
HOST_GRPC_USER=localhost:50051
HOST_GRPC_BASIC=localhost:50052
HOST_GRPC_PRODUCE=localhost:50053
HOST_GRPC_SEARCH=localhost:50054

# REST
