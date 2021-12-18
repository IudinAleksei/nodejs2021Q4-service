const BaseService = require('../../common/base-service');
const taskService = require('../tasks/task.service');
const userRepository = require('./user.memory.repository');

const userService = new BaseService(userRepository);

userService.removeByIdAndUnassignConnectedTasks = async (userId) => {
  const allTasks = await taskService.getAll();
  const connectedTasks = allTasks.filter((task) => task.userId === userId);
  connectedTasks.forEach(async (task) => {
    await taskService.removeById(task.id);
    taskService.addItem({ ...task, userId: null });
  });
  userService.removeById(userId);
};

module.exports = userService;
