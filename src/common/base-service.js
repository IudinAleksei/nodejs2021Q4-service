class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  async getAll() {
    return this.repository.getAllItems();
  }

  async getById(id) {
    return this.repository.getItem(id);
  }

  async removeById(id) {
    // const itemFromDB = await this.repository.getItem(id);
    await this.repository.removeItem(id);
  }
}

module.exports = BaseService;
