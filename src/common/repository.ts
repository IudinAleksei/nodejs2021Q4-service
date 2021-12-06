import { IDBItem } from './common.types';

export class Repository {
  data: IDBItem[];

  constructor(data = []) {
    this.data = data;
  }

  /**
   * Returns all items from database.
   *
   * @returns The array of database items
   *
   */

  async getAllItems() {
    return this.data;
  }

  /**
   * Returns item with corresponding id from database.
   *
   * @param id - The id of required item
   * @returns The item with passed id or undefined, if item not found
   *
   */

  async getItem(id: string) {
    return this.data.find((item) => item.id === id);
  }

  /**
   * Add item to database.
   *
   * @param item - Item that will be added to database
   *
   */

  async addItem(item: IDBItem) {
    this.data = [...this.data, item];
  }

  /**
   * Remove item with corresponding id from database.
   *
   * @param id - The item id for deletion
   *
   */

  async removeItem(id: string) {
    this.data = this.data.filter((item) => item.id !== id);
  }
}
