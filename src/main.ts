import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { exit } from 'process';
import { Logger as NestPinoLogger, LoggerErrorInterceptor } from 'nestjs-pino';
import { contentParser } from 'fastify-multer';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const configService = new ConfigService();
    const useFastify = configService.get('USE_FASTIFY');
    const httpAdapter = useFastify
      ? new FastifyAdapter()
      : new ExpressAdapter();
    const app = await NestFactory.create(AppModule, httpAdapter);
    if (useFastify) {
      await (app as NestFastifyApplication).register(contentParser);
    }
    app.useLogger(app.get(NestPinoLogger));
    app.flushLogs();
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new LoggerErrorInterceptor());
    const port = configService.get('PORT');
    await app.listen(port, '0.0.0.0');
  } catch (err) {
    Logger.error(err);
    exit(1);
  }
}

bootstrap();

process.on('unhandledRejection', (reason) => {
  Logger.error(reason);
  exit(1);
});

process.on('uncaughtException', (error) => {
  Logger.error(error);
  process.exit(1);
});
