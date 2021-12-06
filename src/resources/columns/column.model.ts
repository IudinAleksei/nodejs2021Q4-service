import { v4 as uuidv4 } from 'uuid';

export class Column {
  id: string;

  title: string;

  order: number;

  constructor({ id = uuidv4(), title = 'column', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  static toResponse(column) {
    const { id, title, order } = column;
    return { id, title, order };
  }
}
