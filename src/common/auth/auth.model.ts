import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../resources/users/user.model';

@Entity('AuthData')
export class AuthData extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  token!: string;

  @OneToOne(() => User, (user) => user, { createForeignKeyConstraints: false })
  user!: User;
}
