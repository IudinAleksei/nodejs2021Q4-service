import { IDBItem } from './common.types';
import { Repository } from './repository';
import { HTTP_ERRORS_INFO } from './constants';
import { CustomServerError } from './errors';

export class BaseService<T extends IDBItem> {
  repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async getAll(): Promise<T[]> {
    return this.repository.getAllItems();
  }

  async getById(id: string): Promise<T> {
    const itemFromDB = await this.repository.getItem(id);
    if (itemFromDB) {
      return itemFromDB;
    }
    throw new CustomServerError(HTTP_ERRORS_INFO.invalidId);
  }

  async addItem(item: T): Promise<T> {
    this.repository.addItem(item);
    return this.repository.getItem(item.id);
  }

  async removeById(id: string): Promise<void> {
    await this.getById(id);
    await this.repository.removeItem(id);
  }
}
