const BaseService = require('../../common/base-service');
const taskService = require('../tasks/task.service');
const boardRepository = require('./board.memory.repository');

const boardService = new BaseService(boardRepository);

boardService.removeByIdWithConnectedTasks = async (boardId) => {
  const allTasks = await taskService.getAll();
  const connectedTasks = allTasks.filter((task) => task.boardId === boardId);
  connectedTasks.forEach((task) => taskService.removeById(task.id));
  boardService.removeById(boardId);
};

module.exports = boardService;
