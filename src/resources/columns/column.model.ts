import { v4 as uuidv4 } from 'uuid';

/**
 * @remarks this class describe Column model used in Board
 */
export class Column {
  id: string;

  title: string;

  order: number;

  /**
   * Create Column instance with passed id, title and order
   *
   * @param id - column id
   * @defaultValue generated with v4 method of uuid
   *
   * @param title - column title
   * @defaultValue string 'Column'
   *
   * @param order - number that describe columns order
   * @defaultValue 0
   */
  constructor({ id = uuidv4(), title = 'Column', order = 0 }) {
    this.id = id;
    this.title = title;
    this.order = order;
  }

  /**
   * Static func for create response body with column properties
   *
   * @param column - Column instance to response
   * @returns Return object for response body with id, title and order
   */
  static toResponse(column: Column) {
    const { id, title, order } = column;
    return { id, title, order };
  }
}
