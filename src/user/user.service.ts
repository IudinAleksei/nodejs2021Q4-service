import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ADMIN_USER } from 'src/config/constants';
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

  // async findByLogin(login: string): Promise<User | undefined> {
  //   const temp = await this.prismaService.user.findMany();
  //   return temp[0];
  // }
  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> | never {
    return plainToInstance(
      User,
      this.prismaService.user.update({
        data: plainToInstance(User, updateUserDto),
        where: {
          id,
        },
      }),
    );
  }

  async remove(id: string): Promise<void> | never {
    const item = await this.prismaService.user.delete({
      where: {
        id,
      },
    });
    if (item) return;
    throw new NotFoundException();
  }
}
