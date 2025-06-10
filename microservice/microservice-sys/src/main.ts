import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { WinstonModule } from 'nest-winston';
import { winstonLoggerOptions } from './logger.config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonLoggerOptions),
  });

  const logger = new Logger('Bootstrap');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      url: process.env.HOST_GRPC_DATASYS,
      package: [
        'sys.payroll.payroll_sys'
      ],
      protoPath: [
        join(__dirname, '..', '..', 'proto', 'sys', 'payroll', 'payroll_sys.proto'),

      ],
      loader: {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
      },
      channelOptions: {
        'grpc.max_concurrent_streams': 100,
        'grpc.default_compression_algorithm': 2,
        'grpc.max_receive_message_length': 1024 * 1024 * 1024,
        'grpc.max_send_message_length': 1024 * 1024 * 1024,
        'grpc.http2.lookahead_bytes': 0,
        'grpc.enable_http_proxy': 0,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(55550);

  logger.log('🚀 REST API chạy trên http://localhost:55550');
  logger.log('🚀 gRPC Microservice chạy trên localhost:55550');
}

bootstrap();
