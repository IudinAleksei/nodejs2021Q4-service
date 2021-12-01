const Repository = require('../../common/repository');
const Board = require('./board.model');

const boardRepository = new Repository([
  new Board({ title: 'Board', columns: ['', ''] }),
]);

module.exports = boardRepository;
