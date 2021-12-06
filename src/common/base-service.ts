import { HTTP_ERRORS_INFO } from './constants';

export class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  async getAll() {
    return this.repository.getAllItems();
  }

  async getById(id) {
    const itemFromDB = await this.repository.getItem(id);
    if (itemFromDB) {
      return itemFromDB;
    }
    throw HTTP_ERRORS_INFO.notFound;
  }

  async addItem(item) {
    this.repository.addItem(item);
    return this.repository.getItem(item.id);
  }

  async removeById(id) {
    await this.getById(id);
    await this.repository.removeItem(id);
  }
}
