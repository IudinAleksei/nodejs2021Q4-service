const User = require('./user.model');
const usersService = require('./user.service');

async function routes(fastify, options) {
  fastify.route({
    method: 'GET',
    url: '/',
    async handler(request, reply) {
      const users = await usersService.getAll();
      return users.map(User.toResponse);
    },
  });

  fastify.route({
    method: 'GET',
    url: '/:userId',
    async handler(request, reply) {
      const user = await usersService.getById(request.params.userId);
      return User.toResponse(user);
    },
  });

  fastify.route({
    method: 'POST',
    url: '/',
    async handler(request, reply) {
      const createdUser = await usersService.createUser();
      return User.toResponse(createdUser);
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
      return 'PUT';
    },
  });
}

module.exports = routes;
