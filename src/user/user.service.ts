import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { ADMIN_USER } from 'src/config/constants';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    // usersRepository.save(plainToInstance(User, ADMIN_USER));
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.save(plainToInstance(User, createUserDto));
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> | never {
    const item = await this.usersRepository.findOne(id);
    if (item) return item;
    throw new NotFoundException();
  }

  findByLogin(login: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ login });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> | never {
    await this.findOne(id);
    return this.usersRepository.save(plainToInstance(User, updateUserDto));
  }

  async remove(id: string): Promise<void> | never {
    const report = await this.usersRepository.delete(id);
    if (!report.affected) throw new NotFoundException();
  }
}
