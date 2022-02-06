import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Injectable, mixin, NestInterceptor, Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';
import { AnyFilesFastifyInterceptor } from 'fastify-file-interceptor';

export function MultiAdapterFilesInterceptor(): Type<NestInterceptor> {
  @Injectable()
  class Interceptor implements NestInterceptor {
    fileInterceptor: NestInterceptor;

    constructor(configService: ConfigService) {
      const multerOptions: MulterOptions = {
        storage: diskStorage({
          destination: configService.get('STATIC_FILE_FOLDER'),
          filename: (_, file, cb) => cb(null, file.originalname),
        }),
      };

      this.fileInterceptor = new (
        configService.get('USE_FASTIFY')
          ? AnyFilesFastifyInterceptor(multerOptions)
          : AnyFilesInterceptor(multerOptions)
      )();
    }

    intercept(...args: Parameters<NestInterceptor['intercept']>) {
      return this.fileInterceptor.intercept(...args);
    }
  }
  return mixin(Interceptor);
}
