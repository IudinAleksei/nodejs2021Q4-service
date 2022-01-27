import { Task } from 'src/task/entities/task.entity';

/**
 * @remarks this class describe Board model
 */

export class BoardColumn {
  id: string;

  title: string;

  order: number;

  boardId: string | null;

  tasks: Task[];

  constructor(partial: Partial<BoardColumn>) {
    Object.assign(this, partial);
  }
}
