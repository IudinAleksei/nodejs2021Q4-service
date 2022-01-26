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
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';

@UseGuards(JwtAuthGuard)
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  // @UseInterceptors(FileInterceptor('file'))
  @Post()
  create(@Body() createFileDto: CreateFileDto, @UploadedFile() file: unknown) {
    return this.fileService.upload(file);
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
