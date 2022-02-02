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
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FormDataRequest } from 'nestjs-form-data';
import { FileService } from './file.service';

// @UseGuards(JwtAuthGuard)
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @FormDataRequest()
  uploadFile(@Body() file: Express.Multer.File) {
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
