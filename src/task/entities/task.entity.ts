import { BoardColumn } from 'src/column/entities/column.entity';
import { User } from 'src/user/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Task')
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @Column()
  description: string;

  @ManyToOne(() => BoardColumn, (column) => column.tasks)
  column: BoardColumn;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  constructor(partial: Partial<Task>) {
    super();
    Object.assign(this, partial);
  }
}
