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

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const { id, title, order, description, columnId, userId, boardId } =
      createTaskDto;
    const task = { id, title, order, description };

    const item = await this.prismaService.task.create({
      data: {
        ...task,
        column: {
          // connectOrCreate: {
          //   where: { id: columnId || undefined },
          //   create: { id: columnId || undefined, title: 'cr', boardId },
          // },
        },
        user: {
          // connect: { id: undefined },
        },
      },
      include: {
        column: {
          select: {
            boardId: true,
          },
        },
      },
    });
    return plainToInstance(Task, item);
  }

  async findAll() {
    const items = await this.prismaService.task.findMany({
      include: {
        column: {
          select: {
            boardId: true,
          },
        },
      },
    });

    return plainToInstance(Task, items);
  }

  async findOne(id: string): Promise<Task> | never {
    const item = await this.prismaService.task.findUnique({
      where: {
        id,
      },
      include: {
        column: {
          select: {
            boardId: true,
          },
        },
      },
    });
    if (item) return plainToInstance(Task, item);
    throw new NotFoundException();
  }

  async update(
    pathId: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> | never {
    try {
      const { id, title, order, description, columnId, userId, boardId } =
        updateTaskDto;
      const task = { id, title, order, description, columnId, userId };
      const item = await this.prismaService.task.update({
        where: {
          id: pathId,
        },
        data: task,
        include: {
          column: {
            select: {
              boardId: true,
            },
          },
        },
      });
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
