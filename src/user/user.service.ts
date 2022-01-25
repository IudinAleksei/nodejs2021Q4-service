import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(plainToInstance(User, createUserDto));
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const item = await this.usersRepository.findOne(id);
    if (item) return item;
    throw new NotFoundException();
  }

  findByLogin(login: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ login });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.usersRepository.save(updateUserDto);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
