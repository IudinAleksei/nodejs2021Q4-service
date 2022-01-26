import { Board } from 'src/board/entities/board.entity';
import { Task } from 'src/task/entities/task.entity';
import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

/**
 * @remarks this class describe Board model
 */
@Entity({ name: 'Column' })
export class BoardColumn extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @ManyToOne(() => Board, (board) => board.columns, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  board: Board;

  @OneToMany(() => Task, (task) => task.column, {
    cascade: true,
    nullable: true,
  })
  tasks: Task[];

  constructor(partial: Partial<BoardColumn>) {
    super();
    Object.assign(this, partial);
  }
}
