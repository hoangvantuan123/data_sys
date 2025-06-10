import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { createLogger } from 'winston';
import { TypeOrmLogger } from 'src/common/logger/typeorm-logger';
import { winstonLoggerOptions } from 'src/logger.config';
const winstonLogger = createLogger(winstonLoggerOptions);

import * as dotenv from 'dotenv';
dotenv.config();



export const sqlServerERP: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'AdminErp#',
  database: process.env.POSTGRES_DB || 'sys',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
  logging: true,
  cache: true,
  logger: new TypeOrmLogger(winstonLogger),
  extra: {
    connectionTimeoutMillis: 1200000,
    idleTimeoutMillis: 600000,
  },
  maxQueryExecutionTime: 1200000,
};