import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AbstractHttpAdapter, NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { exit } from 'process';
import * as winston from 'winston';
import { WinstonModule } from 'nest-winston';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const configService = new ConfigService();
    const useFastify = configService.get('USE_FASTIFY');
    const httpAdapter: AbstractHttpAdapter = useFastify
      ? new FastifyAdapter()
      : new ExpressAdapter();
    const logger = WinstonModule.createLogger({
      level: 'info',
      format: winston.format.json(),
      transports: [
        new winston.transports.File({
          dirname: 'logs',
          filename: 'error.log',
          level: 'error',
        }),
        new winston.transports.File({
          dirname: 'logs',
          filename: 'combined.log',
        }),
      ],
    });
    const app = await NestFactory.create(AppModule, httpAdapter, { logger });
    app.useGlobalPipes(new ValidationPipe());
    const port = configService.get('PORT');
    await app.listen(port, '0.0.0.0');
  } catch (err) {
    Logger.error(err);
    exit(1);
  }
}

bootstrap();
