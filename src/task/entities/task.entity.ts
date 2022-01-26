import { Expose, Transform } from 'class-transformer';
import { Board } from 'src/board/entities/board.entity';
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

  @ManyToOne(() => Board, (board) => board.tasks, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @Expose({ name: 'boardId' })
  @Transform((board) => board.value?.id || board.value, {
    toPlainOnly: true,
  })
  board: Board;

  @ManyToOne(() => BoardColumn, (column) => column.tasks, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @Expose({ name: 'columnId' })
  @Transform((column) => column.value?.id || column.value, {
    toPlainOnly: true,
  })
  column: BoardColumn;

  @ManyToOne(() => User, (user) => user.tasks, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @Expose({ name: 'userId' })
  @Transform((user) => user.value?.id || user.value, {
    toPlainOnly: true,
  })
  user: User;

  constructor(partial: Partial<Task>) {
    super();
    Object.assign(this, partial);
  }
}
