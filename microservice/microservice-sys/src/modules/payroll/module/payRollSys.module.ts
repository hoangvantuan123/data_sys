import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { sqlServerERP } from 'src/config/database.config';
import { HrPayrollService } from '../service/payrollSys.service';
import { HrPayroll } from '../entities/hr_payroll.entity';
import { HrPayrollSysController } from '../controller/payrollSys.controller';

@Module({
    imports: [TypeOrmModule.forFeature([HrPayroll]), TypeOrmModule.forRoot(sqlServerERP),],
    providers: [
        HrPayrollService
    ],
    controllers: [HrPayrollSysController],
    exports: [],
})
export class PayRollSysModule { }
