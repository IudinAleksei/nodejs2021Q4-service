const Board = require('./board.model');
// const boardService = require('./board.service');

async function routes(fastify, options) {
  fastify.route({
    method: 'GET',
    url: '/',
    async handler(request, reply) {
      return [];
    },
  });

  fastify.route({
    method: 'GET',
    url: '/:boardId',
    async handler(request, reply) {
      console.log(request.params);
      return { id: request.params.boardId };
    },
  });

  fastify.route({
    method: 'POST',
    url: '/',
    async handler(request, reply) {
      return 'POST';
    },
  });

  fastify.route({
    method: 'PUT',
    url: '/:boardId',
    async handler(request, reply) {
      return 'PUT';
    },
  });

  fastify.route({
    method: 'DELETE',
    url: '/:boardId',
    async handler(request, reply) {
      return 'PUT';
    },
  });
}

module.exports = routes;
