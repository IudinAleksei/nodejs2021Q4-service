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

  // create(createUserDto: CreateUserDto) {
  // return this.prismaService.user.save(plainToInstance(User, createUserDto));
  // }
  async findAll() {
    return this.prismaService.user.findMany();
  }
  // async findOne(id: string): Promise<User> | never {
  //   const item = await this.usersRepository.findOne(id);
  //   if (item) return item;
  //   throw new NotFoundException();
  // }
  // async findByLogin(login: string): Promise<User | undefined> {
  //   const temp = await this.prismaService.user.findMany();
  //   return temp[0];
  // }
  // async update(
  //   id: string,
  //   updateUserDto: UpdateUserDto,
  // ): Promise<User> | never {
  //   await this.findOne(id);
  //   return this.usersRepository.save(plainToInstance(User, updateUserDto));
  // }
  // async remove(id: string): Promise<void> | never {
  //   const report = await this.usersRepository.delete(id);
  //   if (!report.affected) throw new NotFoundException();
  // }
}
