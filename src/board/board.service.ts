import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { plainToInstance } from 'class-transformer';
import { PrismaError } from 'src/config/constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createBoardDto: CreateBoardDto) {
    return plainToInstance(
      Board,
      this.prismaService.board.create({
        data: {
          ...createBoardDto,
          columns: {
            create: createBoardDto.columns,
          },
        },
        include: {
          columns: {
            select: {
              id: true,
              title: true,
              order: true,
            },
          },
        },
      }),
    );
  }

  async findAll() {
    return plainToInstance(
      Board,
      this.prismaService.board.findMany({
        include: {
          columns: {
            select: {
              id: true,
              title: true,
              order: true,
            },
          },
        },
      }),
    );
  }

  async findOne(id: string): Promise<Board> | never {
    const item = await this.prismaService.board.findUnique({
      where: {
        id,
      },
      include: {
        columns: {
          select: {
            id: true,
            title: true,
            order: true,
          },
        },
      },
    });
    if (item) return plainToInstance(Board, item);
    throw new NotFoundException();
  }

  async update(
    id: string,
    updateBoardDto: UpdateBoardDto,
  ): Promise<Board> | never {
    try {
      const item = await plainToInstance(
        Board,
        this.prismaService.board.update({
          where: {
            id,
          },
          data: {
            ...updateBoardDto,
            columns: {
              upsert: updateBoardDto.columns.map((column) => ({
                where: { id: column.id },
                update: column,
                create: column,
              })),
            },
          },
          include: {
            columns: {
              select: {
                id: true,
                title: true,
                order: true,
              },
            },
          },
        }),
      );
      return plainToInstance(Board, item);
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
      await this.prismaService.board.delete({
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
