import { ConfigService } from '@nestjs/config';
import { AbstractHttpAdapter, NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { exit } from 'process';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const configService = new ConfigService();
    const useFastify = configService.get('USE_FASTIFY');
    const httpAdapter: AbstractHttpAdapter = useFastify
      ? new FastifyAdapter()
      : new ExpressAdapter();
    const app = await NestFactory.create(AppModule, httpAdapter);
    const port = configService.get('PORT');
    await app.listen(port, '0.0.0.0');

    // logger.info(`server listening on ${port}`);
  } catch (err) {
    // logger.fatal(err);
    exit(1);
  }
}
bootstrap();

process.on('unhandledRejection', (reason) => {
  // logger.fatal(reason);
  exit(1);
});

process.on('uncaughtException', (error) => {
  // logger.fatal(error);

  exit(1);
});
