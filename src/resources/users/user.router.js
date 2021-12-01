const { HTTP_ERRORS_INFO } = require('../../common/constants');
const User = require('./user.model');
const usersService = require('./user.service');

async function routes(fastify, options) {
  fastify.route({
    method: 'GET',
    url: '/',
    async handler(request, reply) {
      const users = await usersService.getAll();
      reply.send(users.map(User.toResponse));
    },
  });

  fastify.route({
    method: 'GET',
    url: '/:userId',
    async handler(request, reply) {
      const user = await usersService.getById(request.params.userId);
      reply.send(User.toResponse(user));
    },
  });

  fastify.route({
    method: 'POST',
    url: '/',
    async handler(request, reply) {
      const newUser = new User(request.body);
      const createdUser = await usersService.addItem(newUser);
      reply.code(201).send(User.toResponse(createdUser));
    },
  });

  fastify.route({
    method: 'PUT',
    url: '/:userId',
    async handler(request, reply) {
      if (request.body.id !== request.params.userId) {
        throw HTTP_ERRORS_INFO.invalidId;
      }
      const user = new User(request.body);
      await usersService.removeById(user.id);
      const updatedUser = await usersService.addItem(user);
      reply.send(User.toResponse(updatedUser));
    },
  });

  fastify.route({
    method: 'DELETE',
    url: '/:userId',
    async handler(request, reply) {
      await usersService.removeByIdAndUnassignConnectedTasks(
        request.params.userId
      );
      reply.code(204).send();
    },
  });
}

module.exports = routes;
