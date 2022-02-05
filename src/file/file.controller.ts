import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  StreamableFile,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Inject,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileFastifyInterceptor } from 'fastify-file-interceptor';
import { FileService } from './file.service';

// @UseGuards(JwtAuthGuard)
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(
    true
      ? FileFastifyInterceptor('file', {
          storage: diskStorage({
            destination: 'static',
            filename: (req, file, cb) => cb(null, file.originalname),
          }),
        })
      : FileInterceptor('file', {
          storage: diskStorage({
            destination: 'static',
            filename: (req, file, cb) => cb(null, file.originalname),
          }),
        }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    this.fileService.save(file);
  }

  @Get(':filename')
  getFile(@Param('filename') filename: string): StreamableFile {
    return this.fileService.findFile(filename);
  }

  @Delete(':filename')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('filename') filename: string) {
    return this.fileService.remove(filename);
  }
}
