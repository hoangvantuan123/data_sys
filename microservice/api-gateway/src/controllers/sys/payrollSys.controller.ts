import {
    Controller,
    Post,
    Body,
    Req,
    Res,
    HttpStatus,
    HttpException,
    Inject,
    Get,
    Delete,
    UnauthorizedException,
    Query,
    Param
} from '@nestjs/common';
import { timeout } from 'rxjs/operators';
import { Request, Response } from 'express';
import { lastValueFrom } from 'rxjs';
import { gRPCHrPayrollSysService } from 'src/grpc/service/sys/payroll_sys.service';


@Controller('v1/sys')
export class HrPayrollSysController {
    constructor(
        private readonly gRPCHrPayrollSysService: gRPCHrPayrollSysService
    ) { }

    @Post('HrPayrollSysA')
    HrPayrollSysA(@Body() body: { result: any }, @Req() req: Request) {
        if (!body?.result) {
            return { success: false, message: 'Invalid request: Missing "result"' };
        }

        const authorization = req.headers.authorization || '';
        const requestData = { result: body.result, metadata: { authorization } };

        return lastValueFrom(this.gRPCHrPayrollSysService.HrPayrollSysA(requestData.result, requestData.metadata))
            .then((resu) => {
                return resu;
            })
            .catch((error) => {
                return { success: false, message: 'Internal Server Error' };
            });
    }

    @Post('HrPayrollSysD')
    HrPayrollSysD(@Body() body: { result: any[] }, @Req() req: Request) {
        if (!body?.result) {
            return { success: false, message: 'Invalid request: Missing "result"' };
        }

        const authorization = req.headers.authorization || '';
        const requestData = { result: body.result, metadata: { authorization } };

        return lastValueFrom(this.gRPCHrPayrollSysService.HrPayrollSysD(requestData.result, requestData.metadata))
            .then((resu) => {
                return resu;
            })
            .catch((error) => {
                return { success: false, message: 'Internal Server Error' };
            });
    }

    @Post('HrPayrollSysQ')
    HrPayrollSysQ(@Body() body: { result: any }, @Req() req: Request) {
        if (!body?.result) {
            return { success: false, message: 'Invalid request: Missing "result"' };
        }

        const authorization = req.headers.authorization || '';
        const requestData = { result: body.result, metadata: { authorization } };

        return lastValueFrom(this.gRPCHrPayrollSysService.HrPayrollSysQ(requestData.result, requestData.metadata))
            .then((resu) => {
                return resu;
            })
            .catch((error) => {
                return { success: false, message: 'Internal Server Error' };
            });
    }




}