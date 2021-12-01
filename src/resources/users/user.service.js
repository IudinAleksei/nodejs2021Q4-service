const BaseService = require('../../common/base-service');
const userRepository = require('./user.memory.repository');
const User = require('./user.model');

const userService = new BaseService(userRepository);

userService.createItem = () => {
  const newUser = new User({ name: 'Ivan', login: 'lion', password: 'qwert' });
  userRepository.addItem(newUser);
  return userRepository.getItem(newUser.id);
};

module.exports = userService;
