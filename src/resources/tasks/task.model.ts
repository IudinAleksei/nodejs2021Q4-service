import { v4 as uuidv4 } from 'uuid';
import { Entity, Column, PrimaryColumn } from 'typeorm';

/**
 * @remarks this class describe Task model
 */

@Entity({ name: 'Task' })
export class Task {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  order: number;

  @Column()
  description: string;

  @Column({
    type: String,
    nullable: true,
  })
  userId: string | null;

  @Column({
    type: String,
    nullable: true,
  })
  boardId: string | null;

  @Column({
    type: String,
    nullable: true,
  })
  columnId: string | null;

  /**
   * Create Task instance with passed id, title, order, description, userId, boardId and columnId
   *
   * @param id - task id
   * @defaultValue generated with v4 method of uuid
   *
   * @param title - task title
   * @defaultValue string 'Task'
   *'
   * @param order - number that describe tasks order
   * @defaultValue 0
   *
   * @param description - task description
   * @defaultValue empty string
   *
   * @param userId - id of user to whom the task is assigned
   * @defaultValue null
   *
   * @param boardId - id of board to which the task is assigned
   * @defaultValue null
   *
   * @param columnId - id of column to which the task is assigned
   * @defaultValue null
   */

  constructor(
    {
      id = uuidv4(),
      title = 'Task',
      order = 0,
      description = '',
      userId = null,
      boardId = null,
      columnId = null,
    }: Task = {
      id: uuidv4(),
      title: 'Task',
      order: 0,
      description: '',
      userId: null,
      boardId: null,
      columnId: null,
    }
  ) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  /**
   * Static func for create response body with task properties
   *
   * @param task - Task instance to response
   * @returns Return object for response body with id, title, order, description, userId, boardId and columnId
   */
  static toResponse(task: Task) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}
