const userRepository = require('./user.memory.repository');
const User = require('./user.model');

const getAll = () => userRepository.getAllItems();

const getById = (userId) => userRepository.getItem(userId);

const createUser = () => {
  const newUser = new User({ name: 'Ivan', login: 'lion', password: 'qwert' });
  userRepository.addItem(newUser);
  return userRepository.getItem(newUser.id);
};

module.exports = { getAll, getById, createUser };
