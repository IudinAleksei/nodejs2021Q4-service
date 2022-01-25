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
    return this.taskRepository.find();
  }

  async findOne(id: string): Promise<Task> | never {
    const item = await this.taskRepository.findOne(id);
    if (item) return item;
    throw new NotFoundException();
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> | never {
    await this.taskRepository.update(id, plainToInstance(Task, updateTaskDto));
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> | never {
    const report = await this.taskRepository.delete(id);
    if (!report.affected) throw new NotFoundException();
  }
}
