const Repository = require('../../common/repository');
const Task = require('./task.model');

const taskRepository = new Repository([
  new Task({
    title: 'task',
    order: '1',
    description: 'newtask',
    userId: '1213',
    boardId: 'dfnl',
    columnId: 'dsfsdl',
  }),
]);

module.exports = taskRepository;
