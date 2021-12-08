import { IDBItem } from './common.types';
import { Repository } from './repository';
import { HTTP_ERRORS_INFO } from './constants';
import { CustomServerError } from './errors';

/**
 * @class create base implementation of API service using for all entities of this application
 */
export class BaseService<T extends IDBItem> {
  repository: Repository<T>;

  /**
   *@constructor Constructor function that assign repository to internal variable
   *
   * @param repository - repository that will be used for interaction with database
   *
   */

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  /**
   * Async func return all items from database via connected repository method.
   *
   * @returns The array of database items
   *
   */

  async getAll(): Promise<T[]> {
    return this.repository.getAllItems();
  }

  /**
   * Async func return item with corresponding id from database via connected repository method.
   *
   * @param id - The id of required item
   * @returns The item with passed id
   * @throws custom error if item with passed id not found
   *
   */

  async getById(id: string): Promise<T> | never {
    const itemFromDB = await this.repository.getItem(id);
    if (itemFromDB) {
      return itemFromDB;
    }
    throw new CustomServerError(HTTP_ERRORS_INFO.notFound);
  }

  /**
   * Async func add item to database via connected repository method and try to get this item from database.
   *
   * @param item - Item that will be added to database
   * @returns Passed item from database or undefined, if not found
   *
   */

  async addItem(item: T): Promise<T | undefined> {
    this.repository.addItem(item);
    return this.repository.getItem(item.id);
  }

  /**
   * Async func try to get item from database via method of repository and delete it after this.
   *
   * @param id - Id of item that will be deleted
   *
   */

  async removeById(id: string): Promise<void> {
    await this.getById(id);
    await this.repository.removeItem(id);
  }
}
