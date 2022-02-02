import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FileSystemStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { join } from 'path';
import { FileService } from './file.service';
import { FileController } from './file.controller';

@Module({
  imports: [
    ConfigModule,
    NestjsFormDataModule.configAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        storage: FileSystemStoredFile,
        fileSystemStoragePath: join(
          process.cwd(),
          configService.get('STATIC_FILE_FOLDER'),
        ),
        autoDeleteFile: false,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
