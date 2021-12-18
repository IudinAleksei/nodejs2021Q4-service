const BaseService = require('../../common/base-service');
const taskRepository = require('./task.memory.repository');

const taskService = new BaseService(taskRepository);

module.exports = taskService;
