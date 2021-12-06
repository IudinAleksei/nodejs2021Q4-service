import { v4 as uuidv4 } from 'uuid';

import { Column } from '../columns/column.model';

export class Board {
  id: string;

  title: string;

  columns: Column[];

  constructor({ id = uuidv4(), title = 'Board', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map((input) => new Column(input));
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    const columnsToResponse = columns.map(Column.toResponse);
    return { id, title, columns: columnsToResponse };
  }
}
