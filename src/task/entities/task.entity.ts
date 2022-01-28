import { Expose, Transform } from 'class-transformer';
import { BoardColumn } from '../../column/entities/column.entity';

export class Task {
  id: string;

  title: string;

  order: number;

  description: string;

  columnId: string | null;

  @Expose({ name: 'boardId', toPlainOnly: true })
  @Transform((column) => column.value?.boardId || null, { toPlainOnly: true })
  column: BoardColumn | null;

  userId: string | null;

  constructor(partial: Partial<Task>) {
    Object.assign(this, partial);
  }
}
