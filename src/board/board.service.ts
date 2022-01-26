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
    private boardRepository: Repository<Board>,
  ) {}

  create(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.save(plainToInstance(Board, createBoardDto));
  }

  findAll(): Promise<Board[]> {
    return this.boardRepository.find({ relations: ['columns'] });
  }

  async findOne(id: string): Promise<Board> | never {
    const item = await this.boardRepository.findOne(id, {
      relations: ['columns'],
    });
    if (item) return item;
    throw new NotFoundException();
  }

  async update(
    id: string,
    updateBoardDto: UpdateBoardDto,
  ): Promise<Board> | never {
    await this.findOne(id);
    return this.boardRepository.save(plainToInstance(Board, updateBoardDto));
  }

  async remove(id: string): Promise<void> | never {
    const report = await this.boardRepository.delete(id);
    if (!report.affected) throw new NotFoundException();
  }
}
