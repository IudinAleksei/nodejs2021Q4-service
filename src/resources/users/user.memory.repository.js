const Repository = require('../../common/repository');
const User = require('./user.model');

const userRepository = new Repository([
  new User({ name: 'Vasya', login: 'vasya', password: '1234' }),
]);

module.exports = userRepository;
