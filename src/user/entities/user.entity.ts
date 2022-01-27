import { hashSync } from 'bcrypt';
import { Exclude, Transform } from 'class-transformer';
import { HASH_SALT } from 'src/config/constants';

export class User {
  id: string;

  name: string;

  login: string;

  @Exclude({ toPlainOnly: true })
  @Transform((pass) => hashSync(pass.value, HASH_SALT), { toClassOnly: true })
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
