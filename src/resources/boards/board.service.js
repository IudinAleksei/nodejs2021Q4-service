const BaseService = require('../../common/base-service');
const boardRepository = require('./board.memory.repository');
const Board = require('./board.model');

const boardService = new BaseService(boardRepository);

module.exports = boardService;
