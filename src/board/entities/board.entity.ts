import {
  Entity,
  Column,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { BoardColumn } from 'src/column/entities/column.entity';

/**
 * @remarks this class describe Board model
 */
@Entity({ name: 'Board' })
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => BoardColumn, (column) => column.board)
  columns: BoardColumn[];

  constructor(partial: Partial<Board>) {
    super();
    Object.assign(this, partial);
  }
}
