export class Repository {
  constructor(data = []) {
    this.data = data;
  }

  async getAllItems() {
    return this.data;
  }

  async getItem(id) {
    return this.data.find((item) => item.id === id);
  }

  async addItem(item) {
    this.data = [...this.data, item];
  }

  async removeItem(id) {
    this.data = this.data.filter((item) => item.id !== id);
  }
}
