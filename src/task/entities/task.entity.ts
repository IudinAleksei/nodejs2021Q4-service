import { Expose, Transform } from 'class-transformer';
import { Board } from 'src/board/entities/board.entity';
import { BoardColumn } from 'src/column/entities/column.entity';
import { User } from 'src/user/entities/user.entity';

export class Task {
  id: string;

  title: string;

  order: number;

  description: string;

  board: Board;

  column: BoardColumn;

  user: User;

  constructor(partial: Partial<Task>) {
    Object.assign(this, partial);
  }
}
