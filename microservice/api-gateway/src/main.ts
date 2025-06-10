import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { appConfig } from './config/app.config';
import * as bodyParser from 'body-parser';
import { join } from 'path';
import { WinstonModule } from 'nest-winston';
import { winstonLoggerOptions } from './logger.config';
import { Logger } from '@nestjs/common';

import 'dotenv/config';

async function bootstrap() {
  const server = express();

  server.use(express.json({ limit: '1gb' }));
  server.use(express.urlencoded({ extended: true, limit: '1gb' }));

  // ✅ Khởi tạo Nest app với Winston logger
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server), {
    logger: WinstonModule.createLogger(winstonLoggerOptions),
  });

  const logger = new Logger('Bootstrap');

  // ✅ Ghi log mỗi HTTP request/response
  server.use((req, res, next) => {
    const start = Date.now();
    logger.log(`📤 [REQ] ${req.method} ${req.originalUrl}`);

    res.on('finish', () => {
      const duration = Date.now() - start;
      logger.log(
        `✅ [RES] ${req.method} ${req.originalUrl} - Status: ${res.statusCode} - ⏱ ${duration}ms`,
      );
    });

    next();
  });

  await app.startAllMicroservices();
  app.use(helmet());
  app.enableCors(appConfig.corsOptions);
  app.setGlobalPrefix(appConfig.globalPrefix);

  await app.listen(appConfig.port);
  logger.log(`🚀 API SERVER is running at port ${appConfig.port}`);
}

bootstrap();
