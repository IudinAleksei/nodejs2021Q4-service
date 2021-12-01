const BaseService = require('../../common/base-service');
const taskRepository = require('./task.memory.repository');
const Task = require('./task.model');

const taskService = new BaseService(taskRepository);

module.exports = taskService;
