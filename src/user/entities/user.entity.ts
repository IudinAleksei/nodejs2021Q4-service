import { hashSync } from 'bcrypt';
import { Exclude, Transform } from 'class-transformer';
import { HASH_SALT } from 'src/config/constants';
import { Task } from 'src/task/entities/task.entity';

export class User {
  id: string;

  name: string;

  login: string;

  password: string;

  // tasks: Task[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
