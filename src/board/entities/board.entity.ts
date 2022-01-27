import { BoardColumn } from 'src/column/entities/column.entity';

/**
 * @remarks this class describe Board model
 */
export class Board {
  id: string;

  title: string;

  columns: BoardColumn[];

  constructor(partial: Partial<Board>) {
    Object.assign(this, partial);
  }
}
