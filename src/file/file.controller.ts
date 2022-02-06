import {
  Controller,
  Get,
  Post,
  Param,
  StreamableFile,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MultiAdapterFilesInterceptor } from './file.interceptor';
import { FileService } from './file.service';

@UseGuards(JwtAuthGuard)
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(MultiAdapterFilesInterceptor())
  uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
    return this.fileService.save(files);
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
