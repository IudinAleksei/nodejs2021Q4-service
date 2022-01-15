import { EntityTarget, getConnection, Repository } from 'typeorm';
import { HTTP_ERRORS_INFO } from './constants';
import { CustomServerError } from './errors';

/**
 * @remarks create base implementation of API service using for all entities of this application
 * @typeParam T - Type of databade entities that extend {@link IDBItem}
 */
export class BaseService<T> {
  entity: EntityTarget<T>;

  repository?: Repository<T>;

  /**
   * @remarks Constructor function that assign repository to internal variable
   *
   * @param repository - repository {@link Repository} that will be used for interaction with database
   */
  constructor(entity: EntityTarget<T>) {
    this.entity = entity;
  }

  async getRepo(): Promise<Repository<T>> {
    if (!this.repository) {
      this.repository = getConnection().getRepository(this.entity);
    }
    return this.repository;
  }

  /**
   * Async func return all items from database via connected repository method.
   *
   * @returns The array of database items
   */
  async getAll(): Promise<T[]> {
    const repo = await this.getRepo();
    return repo.find();
  }

  /**
   * Async func return item with corresponding id from database via connected repository method.
   *
   * @param id - The id of required item
   * @returns The item with passed id
   * @throws custom error {@link CustomServerError} if item with passed id not found
   */
  async getById(id: string): Promise<T> | never {
    const repo = await this.getRepo();
    const itemFromDB = await repo.findOne(id);
    if (itemFromDB) {
      return itemFromDB;
    }
    throw new CustomServerError(HTTP_ERRORS_INFO.notFound);
  }

  // /**
  //  * Async func add item to database via connected repository method and try to get this item from database.
  //  *
  //  * @param item - Item that will be added to database
  //  * @returns Passed item from database
  //  * @throws custom error {@link CustomServerError} if passed item not found in database after adding
  //  */
  // async addItem(item: T): Promise<T> | never {
  //   this.repository.addItem(item);
  //   const itemFromDB = await this.repository.getItem(item.id);
  //   if (itemFromDB) {
  //     return itemFromDB;
  //   }
  //   throw new CustomServerError(HTTP_ERRORS_INFO.db);
  // }

  // /**
  //  * Async func try to get item from database via method of repository and delete it after this.
  //  *
  //  * @param id - Id of item that will be deleted
  //  * @throws custom error {@link CustomServerError} if item with passed id not found via {@link getById} method executing
  //  */
  // async removeById(id: string): Promise<void> {
  //   await this.getById(id);
  //   await this.repository.removeItem(id);
  // }

  // /**
  //  * Async func try to delete item from database via this service method {@link removeById} and add new data after this.
  //  *
  //  * @param item - Item that will be updated in database
  //  * @returns Passed item from database
  //  * @throws custom error {@link CustomServerError} {@link HTTP_ERRORS_INFO.notFound} if passed item not found in database via {@link getById} method executing
  //  * @throws custom error {@link CustomServerError} {@link HTTP_ERRORS_INFO.db} if passed item not found in database via {@link addItem} after adding
  //  */
  // async updateItem(item: T): Promise<T> | never {
  //   await this.removeById(item.id);
  //   return this.addItem(item);
  // }
}
