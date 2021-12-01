const Board = require('./board.model');
const boardService = require('./board.service');

async function routes(fastify, options) {
  fastify.route({
    method: 'GET',
    url: '/',
    async handler(request, reply) {
      const boards = await boardService.getAll();
      reply.send(boards.map(Board.toResponse));
    },
  });

  fastify.route({
    method: 'GET',
    url: '/:boardId',
    async handler(request, reply) {
      const board = await boardService.getById(request.params.boardId);
      reply.send(Board.toResponse(board));
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
      await boardService.removeById(request.params.boardId);
      reply.code(204).send();
    },
  });
}

module.exports = routes;
