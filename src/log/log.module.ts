import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { parse } from 'url';
import pino, { TransportMultiOptions } from 'pino';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './logger.interceptor';

const generateTransportConfig = (
  logLevel: pino.LevelWithSilent,
): TransportMultiOptions => {
  return {
    targets: [
      {
        level: logLevel,
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
};

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          pinoHttp: {
            quietReqLogger: true,
            transport: generateTransportConfig(configService.get('LOG_LEVEL')),
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
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class LogModule {}
