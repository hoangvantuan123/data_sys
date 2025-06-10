import {
    Controller,
} from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { MetadataResponse } from 'src/common/interfaces/response';
import { HrPayrollService } from '../service/payrollSys.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Controller()
export class HrPayrollSysController {
    constructor(private readonly hrPayrollService: HrPayrollService) { }

    private handleGrpcRequest(
        request: any,
        serviceMethod: (result: any) => Observable<any>
    ): Observable<MetadataResponse> {
        return serviceMethod(request.result).pipe(
            map(queryResult => {
                const isSuccess = queryResult?.success === true;
                return {
                    success: isSuccess,
                    message: isSuccess ? "Query successful" : (queryResult?.message || "Query failed"),
                    data: isSuccess ? JSON.stringify(queryResult?.data || []) : '',
                    errors: isSuccess ? '' : 'Query execution failed',
                };
            }),
            catchError(() => {
                return of({
                    success: false,
                    message: 'Internal server error',
                    data: '',
                    errors: 'Internal server error',
                });
            })
        );
    }

    @GrpcMethod('HrPayrollSysService', 'HrPayrollSysA')
    HrPayrollSysA(request: any[]): Observable<MetadataResponse> {
        return this.handleGrpcRequest(request, this.hrPayrollService.HrPayrollSysA.bind(this.hrPayrollService));
    }

    @GrpcMethod('HrPayrollSysService', 'HrPayrollSysD')
    HrPayrollSysD(request: any): Observable<MetadataResponse> {
        return this.handleGrpcRequest(request, this.hrPayrollService.HrPayrollSysD.bind(this.hrPayrollService));
    }

    @GrpcMethod('HrPayrollSysService', 'HrPayrollSysQ')
    HrPayrollSysQ(request: any[]): Observable<MetadataResponse> {
        return this.handleGrpcRequest(request, this.hrPayrollService.HrPayrollSysQ.bind(this.hrPayrollService));
    }
}
