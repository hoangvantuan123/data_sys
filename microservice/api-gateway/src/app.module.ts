import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import * as dotenv from 'dotenv';
import { gRPCHrPayrollSysService } from './grpc/service/sys/payroll_sys.service';
import { HrPayrollSysController } from './controllers/sys/payrollSys.controller';
dotenv.config();



@Module({
  imports: [
    ClientsModule.register([

    ]),
  ],
  controllers: [

    HrPayrollSysController
  ]
  ,
  providers: [
    gRPCHrPayrollSysService

  ]



})
export class AppModule { }
