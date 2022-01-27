import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createReadStream } from 'fs';
import { unlink } from 'fs/promises';
import { join } from 'path';
import { CreateFileDto } from './dto/create-file.dto';

@Injectable()
export class FileService {
  constructor(private readonly configService: ConfigService) {}

  upload(file: CreateFileDto) {
    return 'This action adds a new file';
  }

  findFile(filename: string): StreamableFile | never {
    try {
      const file = createReadStream(
        join(
          process.cwd(),
          this.configService.get('STATIC_FILE_FOLDER'),
          filename,
        ),
        { autoClose: true },
      );
      return new StreamableFile(file);
    } catch {
      throw new NotFoundException();
    }
  }

  async remove(filename: string): Promise<void> {
    try {
      await unlink(
        join(
          process.cwd(),
          this.configService.get('STATIC_FILE_FOLDER'),
          filename,
        ),
      );
    } catch {
      throw new NotFoundException();
    }
  }
}