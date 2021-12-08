import { IDBItem } from './common.types';

/**
 * @class create base implementation of repository using for interaction with databases
 */
export class Repository<T extends IDBItem> {
  data: T[];

  constructor(data: T[] = []) {
    this.data = data;
  }

  /**
   * Returns all items from database.
   *
   * @returns The array of database items
   *
   */

  async getAllItems(): Promise<T[]> {
    return this.data;
  }

  /**
   * Returns item with corresponding id from database.
   *
   * @param id - The id of required item
   * @returns The item with passed id or undefined, if item not found
   *
   */

  async getItem(id: string): Promise<T | undefined> {
    return this.data.find((item) => item.id === id);
  }

  /**
   * Add item to database.
   *
   * @param item - Item that will be added to database
   *
   */

  async addItem(item: T): Promise<void> {
    this.data = [...this.data, item];
  }

  /**
   * Remove item with corresponding id from database.
   *
   * @param id - The item id for deletion
   *
   */

  async removeItem(id: string): Promise<void> {
    this.data = this.data.filter((item) => item.id !== id);
  }
}
