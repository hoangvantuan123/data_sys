import { Module, MiddlewareConsumer, OnModuleInit } from '@nestjs/common';
import * as cors from 'cors';
import { TypeOrmModule, InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { sqlServerERP } from './config/database.config';
import { APP_FILTER } from '@nestjs/core';
import { PayRollSysModule } from './modules/payroll/module/payRollSys.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...sqlServerERP,
      name: 'ERP',
    }),
    PayRollSysModule
  ],
  providers: [{
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  }],
  controllers: [],
})


export class AppModule implements OnModuleInit {
  constructor(
    @InjectConnection('ERP') private readonly connection2: Connection,
  ) { }

  async onModuleInit() {


    if (this.connection2.isConnected) {
      console.log('ERP connected');
    } else {
      console.error('Failed to connect to the second database');
    }
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes('*');
  }
}
