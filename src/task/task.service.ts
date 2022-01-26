import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.save(plainToInstance(Task, createTaskDto));
  }

  findAll(): Promise<Task[]> {
    return this.taskRepository.find({ relations: ['column', 'board', 'user'] });
  }

  async findOne(id: string): Promise<Task> | never {
    const item = await this.taskRepository.findOne(id, {
      relations: ['column', 'board', 'user'],
    });
    if (item) return item;
    throw new NotFoundException();
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> | never {
    await this.findOne(id);
    return this.taskRepository.save(plainToInstance(Task, updateTaskDto));
  }

  async remove(id: string): Promise<void> | never {
    const report = await this.taskRepository.delete(id);
    if (!report.affected) throw new NotFoundException();
  }
}
