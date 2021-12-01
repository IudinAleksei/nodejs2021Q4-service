const taskRepository = require('./task.memory.repository');
const Task = require('./task.model');

const getAll = () => taskRepository.getAllItems();

const getById = (taskId) => taskRepository.getItem(taskId);

module.exports = { getAll, getById };
