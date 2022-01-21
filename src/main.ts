import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { exit } from 'process';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );
    const configService = app.get(ConfigService);
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
