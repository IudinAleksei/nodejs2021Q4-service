import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { exit } from 'process';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const configService = new ConfigService();
    const useFastify = configService.get('USE_FASTIFY');
    let httpAdapter;
    if (useFastify) {
      httpAdapter = new FastifyAdapter();
      httpAdapter
        .getInstance()
        .addContentTypeParser('*', (request, payload, done) => {
          done(null, null);
        });
    } else {
      httpAdapter = new ExpressAdapter();
    }
    const app = await NestFactory.create(AppModule, httpAdapter, {
      bufferLogs: true,
    });
    app.useLogger(app.get(Logger));
    app.flushLogs();
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new LoggerErrorInterceptor());
    const port = configService.get('PORT');
    await app.listen(port, '0.0.0.0');
  } catch (err) {
    exit(1);
  }
}

bootstrap();
