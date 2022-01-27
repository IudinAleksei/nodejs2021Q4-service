import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { plainToInstance } from 'class-transformer';
import { ADMIN_USER, PrismaError } from 'src/config/constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    return plainToInstance(
      User,
      this.prismaService.user.create({
        data: plainToInstance(User, createUserDto),
      }),
    );
  }

  async findAll() {
    return plainToInstance(User, this.prismaService.user.findMany());
  }

  async findOne(id: string): Promise<User> | never {
    const item = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
    if (item) return plainToInstance(User, item);
    throw new NotFoundException();
  }

  async findByLogin(login: string): Promise<User | undefined> {
    const item = await this.prismaService.user.findFirst({
      where: {
        login,
      },
    });
    return item;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> | never {
    try {
      const item = await plainToInstance(
        User,
        this.prismaService.user.update({
          where: {
            id,
          },
          data: plainToInstance(User, updateUserDto),
        }),
      );
      return plainToInstance(User, item);
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
      await this.prismaService.user.delete({
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
