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
      const createdUser = await usersService.createUser();
      reply.code(201).send(User.toResponse(createdUser));
    },
  });

  fastify.route({
    method: 'PUT',
    url: '/:userId',
    async handler(request, reply) {
      return 'PUT';
    },
  });

  fastify.route({
    method: 'DELETE',
    url: '/:userId',
    async handler(request, reply) {
      await usersService.removeById(request.params.userId);
      reply.code(204).send();
    },
  });
}

module.exports = routes;
