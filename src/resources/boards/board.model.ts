import { v4 as uuidv4 } from 'uuid';
import { Entity, Column, PrimaryColumn } from 'typeorm';

import { BoardColumn } from '../columns/column.model';

/**
 * @remarks this class describe Board model
 */
@Entity()
export class Board {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  columns: BoardColumn[];

  /**
   * Create Board instance with passed id, title and columns
   *
   * @param id - board id
   * @defaultValue generated with v4 method of uuid
   *
   * @param title - board title
   * @defaultValue string 'Board'
   *'
   * @param columns - array of board columns
   * @defaultValue empty array
   */
  constructor(
    { id = uuidv4(), title = 'Board', columns = [] }: Board = {
      id: uuidv4(),
      title: 'Board',
      columns: [],
    }
  ) {
    this.id = id;
    this.title = title;
    this.columns = columns.map((input) => new BoardColumn(input));
  }

  /**
   * Static func for create response body with board properties
   *
   * @param board - Board instance to response
   * @returns Return object for response body with id, title and columns
   */
  static toResponse(board: Board) {
    const { id, title, columns } = board;
    const columnsToResponse = columns.map(BoardColumn.toResponse);
    return { id, title, columns: columnsToResponse };
  }
}
