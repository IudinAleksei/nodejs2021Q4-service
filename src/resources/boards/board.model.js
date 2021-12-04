const uuid = require('uuid');

const Column = require('../columns/column.model');

class Board {
  constructor({ id = uuid.v4(), title = 'Board', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map((input) => new Column(input));
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    const columnsToResponse = columns.map(Column.toResponse);
    return { id, title, columns: columnsToResponse };
  }
}

module.exports = Board;
