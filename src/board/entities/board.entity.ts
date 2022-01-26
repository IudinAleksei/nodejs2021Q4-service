import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { BoardColumn } from 'src/column/entities/column.entity';
import { Task } from 'src/task/entities/task.entity';

/**
 * @remarks this class describe Board model
 */
@Entity({ name: 'Board' })
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => BoardColumn, (column) => column.board, {
    cascade: true,
    nullable: true,
  })
  columns: BoardColumn[];

  @OneToMany(() => Task, (task) => task.column, {
    cascade: true,
    nullable: true,
  })
  tasks: Task[];

  constructor(partial: Partial<Board>) {
    super();
    Object.assign(this, partial);
  }
}
