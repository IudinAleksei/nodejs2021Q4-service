import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private taskRepository: Repository<Board>,
  ) {}

  create(createTaskDto: CreateBoardDto): Promise<Board> {
    return this.taskRepository.save(plainToInstance(Board, createTaskDto));
  }

  findAll(): Promise<Board[]> {
    return this.taskRepository.find();
  }

  async findOne(id: string): Promise<Board> | never {
    const item = await this.taskRepository.findOne(id);
    if (item) return item;
    throw new NotFoundException();
  }

  async update(
    id: string,
    updateBoardDto: UpdateBoardDto,
  ): Promise<Board> | never {
    await this.taskRepository.update(
      id,
      plainToInstance(Board, updateBoardDto),
    );
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> | never {
    const report = await this.taskRepository.delete(id);
    if (!report.affected) throw new NotFoundException();
  }
}
