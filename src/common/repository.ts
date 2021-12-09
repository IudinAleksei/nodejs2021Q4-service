import { IDBItem } from './common.types';

/**
 * @remarks create base implementation of repository using for interaction with databases
 * @typeParam T - Type of databade entities that extend {@link IDBItem}
 */
export class Repository<T extends IDBItem> {
  data: T[];

  /**
   * @remarks Constructor function assign initial array of databade entities to internal variable
   *
   * @param data - initial array of databade entities
   * @defaultValue - empty array
   */
  constructor(data: T[] = []) {
    this.data = data;
  }

  /**
   * Returns all items from internal variable {@link data}
   *
   * @returns The array of database items in promise
   */
  async getAllItems(): Promise<T[]> {
    return this.data;
  }

  /**
   * Returns item with corresponding id from internal variable {@link data}
   *
   * @param id - The id of required item
   * @returns The item with passed id or undefined, if item not found
   */
  async getItem(id: string): Promise<T | undefined> {
    return this.data.find((item) => item.id === id);
  }

  /**
   * Add item to database.
   *
   * @param item - Item that will be added to internal variable {@link data}
   */
  async addItem(item: T): Promise<void> {
    this.data = [...this.data, item];
  }

  /**
   * Remove item with corresponding id from internal variable {@link data}
   *
   * @param id - The item id for deletion
   */
  async removeItem(id: string): Promise<void> {
    this.data = this.data.filter((item) => item.id !== id);
  }
}
