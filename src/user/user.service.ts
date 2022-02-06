import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { hash } from 'bcrypt';
import { HASH_SALT, PrismaError } from 'src/config/constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  private async hashPass(password: string): Promise<string> {
    return hash(password, HASH_SALT);
  }

  async create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: await this.hashPass(createUserDto.password),
      },
      select: {
        login: true,
        name: true,
        id: true,
      },
    });
  }

  async findAll() {
    return this.prismaService.user.findMany({
      select: {
        login: true,
        name: true,
        id: true,
      },
    });
  }

  async findOne(id: string) {
    const item = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        login: true,
        name: true,
        id: true,
      },
    });
    if (item) return item;
    throw new NotFoundException();
  }

  async findByLogin(login: string): Promise<User | undefined> {
    const item = await this.prismaService.user.findFirst({
      where: { login },
    });
    return item;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const item = await this.prismaService.user.update({
        where: { id },
        data: {
          ...updateUserDto,
          password: await this.hashPass(updateUserDto.password),
        },
        select: {
          login: true,
          name: true,
          id: true,
        },
      });
      return item;
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
