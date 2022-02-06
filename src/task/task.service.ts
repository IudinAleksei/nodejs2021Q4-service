import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaError } from 'src/config/constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    const { id, title, order, description, columnId, userId, boardId } =
      createTaskDto;
    const task = { id, title, order, description };

    return this.prismaService.task.create({
      data: {
        ...task,
        column: {
          connect: columnId ? { id: columnId } : undefined,
        },
        board: {
          connect: boardId ? { id: boardId } : undefined,
        },
        user: {
          connect: userId ? { id: userId } : undefined,
        },
      },
    });
  }

  async findAll() {
    return this.prismaService.task.findMany();
  }

  async findOne(id: string): Promise<Task> | never {
    const item = await this.prismaService.task.findUnique({
      where: { id },
    });
    if (item) return item;
    throw new NotFoundException();
  }

  async update(
    pathId: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> | never {
    try {
      return await this.prismaService.task.update({
        where: { id: pathId },
        data: updateTaskDto,
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

  async remove(id: string): Promise<void> | never {
    try {
      await this.prismaService.task.delete({
        where: { id },
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
