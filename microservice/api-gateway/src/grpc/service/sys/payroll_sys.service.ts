import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { join } from 'path';
import { map, catchError } from 'rxjs/operators';
import 'dotenv/config';
interface HrPayrollSysService {
    HrPayrollSysA(data: { result: any; metadata: Record<string, string> }): Observable<any>;
    HrPayrollSysD(data: { result: any; metadata: Record<string, string> }): Observable<any>;
    HrPayrollSysQ(data: { result: any; metadata: Record<string, string> }): Observable<any>;
}


@Injectable()
export class gRPCHrPayrollSysService {


    private createGrpcClient(): ClientGrpc {
        return ClientProxyFactory.create({
            transport: Transport.GRPC,
            options: {
                url: process.env.HOST_GRPC_DATASYS,
                package: [
                    'sys.payroll.payroll_sys',
                ],
                protoPath: [
                    join(__dirname, '..', '..', '..', '..', '..', 'proto', 'sys', 'payroll', 'payroll_sys.proto'),
                ],
                loader: {
                    keepCase: true,
                    longs: String,
                    enums: String,
                    defaults: true,
                    oneofs: true,
                },
                channelOptions: {
                    'grpc.default_compression_algorithm': 2,
                    'grpc.max_receive_message_length': 1024 * 1024 * 1024,
                    'grpc.max_send_message_length': 1024 * 1024 * 1024,
                    'grpc.max_concurrent_streams': 100,
                    'grpc.http2.lookahead_bytes': 0,
                    'grpc.enable_http_proxy': 0,
                },
            },
        }) as ClientGrpc;
    }


    HrPayrollSysA(result: any, metadata: Record<string, string> = {}): Observable<any> {
        const client = this.createGrpcClient();
        const metadataService = client.getService<HrPayrollSysService>('HrPayrollSysService');

        return metadataService.HrPayrollSysA({ result, metadata }).pipe(
            map((grpcResponse) => {
                return {
                    success: grpcResponse?.success,
                    message: grpcResponse?.message || 'No message received',
                    data: grpcResponse?.data || null,
                };
            }),
            catchError((error) => {
                console.log('error', error)
                return new Observable((subscriber) => {
                    subscriber.next({
                        success: false,
                        message: 'Error while calling gRPC service',
                        errorDetails: error?.errors,
                    });
                    subscriber.complete();
                });
            })
        );
    }

    HrPayrollSysD(result: any, metadata: Record<string, string> = {}): Observable<any> {
        const client = this.createGrpcClient();
        const metadataService = client.getService<HrPayrollSysService>('HrPayrollSysService');

        return metadataService.HrPayrollSysD({ result, metadata }).pipe(
            map((grpcResponse) => {
                return {
                    success: grpcResponse?.success,
                    message: grpcResponse?.message || 'No message received',
                    data: grpcResponse?.data || null,
                };
            }),
            catchError((error) => {
                return new Observable((subscriber) => {
                    subscriber.next({
                        success: false,
                        message: 'Error while calling gRPC service',
                        errorDetails: error?.errors,
                    });
                    subscriber.complete();
                });
            })
        );
    }
    HrPayrollSysQ(result: any, metadata: Record<string, string> = {}): Observable<any> {
        const client = this.createGrpcClient();
        const metadataService = client.getService<HrPayrollSysService>('HrPayrollSysService');

        return metadataService.HrPayrollSysQ({ result, metadata }).pipe(
            map((grpcResponse) => {
                return {
                    success: grpcResponse?.success,
                    message: grpcResponse?.message || 'No message received',
                    data: grpcResponse?.data || null,
                };
            }),
            catchError((error) => {
                return new Observable((subscriber) => {
                    subscriber.next({
                        success: false,
                        message: 'Error while calling gRPC service',
                        errorDetails: error?.errors,
                    });
                    subscriber.complete();
                });
            })
        );
    }



}
