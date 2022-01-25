import { hashSync } from 'bcrypt';
import { Exclude, Transform } from 'class-transformer';
import { HASH_SALT } from 'src/constants';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'User' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  @Transform((pass) => hashSync(pass.value, HASH_SALT), { toClassOnly: true })
  password: string;

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
