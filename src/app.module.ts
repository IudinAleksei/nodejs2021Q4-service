import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { parse } from 'url';
import { TransportMultiOptions } from 'pino';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { ColumnModule } from './column/column.module';
import { BoardModule } from './board/board.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';

export const TRANSPORT_CONFIG: TransportMultiOptions = {
  targets: [
    {
      level: 'trace',
      target: 'pino-pretty',
      options: {
        destination: 'logs/info.log',
        colorize: false,
        translateTime: true,
      },
    },
    {
      level: 'error',
      target: 'pino-pretty',
      options: {
        destination: 'logs/errors.log',
        colorize: false,
        translateTime: true,
      },
    },
    {
      level: 'silent',
      target: 'pino/file',
      options: {
        destination: 'logs/errors.log',
      },
    },
  ],
};

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          pinoHttp: {
            transport: TRANSPORT_CONFIG,
            wrapSerializers: true,
            serializers: {
              res(reply) {
                return {
                  statusCode: reply.statusCode,
                };
              },
              req(request) {
                return {
                  method: request.method,
                  url: request.url,
                  queryParams: parse(request.url, true)?.query,
                };
              },
            },
          },
        };
      },
    }),
    UserModule,
    TaskModule,
    ColumnModule,
    BoardModule,
    AuthModule,
    FileModule,
  ],
})
export class AppModule {}
