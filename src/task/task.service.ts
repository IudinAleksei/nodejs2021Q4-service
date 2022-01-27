import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { plainToInstance } from 'class-transformer';
import { PrismaError } from 'src/config/constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createTaskDto: CreateTaskDto) {
    return plainToInstance(
      Task,
      this.prismaService.task.create({
        data: plainToInstance(Task, createTaskDto),
      }),
    );
  }

  async findAll() {
    return plainToInstance(Task, this.prismaService.task.findMany());
  }

  async findOne(id: string): Promise<Task> | never {
    const item = await this.prismaService.task.findUnique({
      where: {
        id,
      },
    });
    if (item) return plainToInstance(Task, item);
    throw new NotFoundException();
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> | never {
    try {
      const item = await plainToInstance(
        Task,
        this.prismaService.task.update({
          where: {
            id,
          },
          data: plainToInstance(Task, updateTaskDto),
        }),
      );
      return plainToInstance(Task, item);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new NotFoundException();
      }
      throw error;
    }
  }

  async remove(id: string): Promise<void> | never {
    try {
      await this.prismaService.task.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PrismaError.RecordDoesNotExist
      ) {
        throw new NotFoundException();
      }
      throw error;
    }
  }
}
