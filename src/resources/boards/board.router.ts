import { FastifyInstance } from 'fastify';
import { Board } from './board.model';
import { boardService } from './board.service';
import { IBoardRequest } from './board.types';

export async function boardRoutes(fastify: FastifyInstance) {
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
    async handler(request: IBoardRequest, reply) {
      const board = await boardService.getById(request.params.boardId);
      reply.send(Board.toResponse(board));
    },
  });

  fastify.route({
    method: 'POST',
    url: '/',
    async handler(request: IBoardRequest, reply) {
      const newBoard = new Board(request.body);
      const createdBoard = await boardService.addItem(newBoard);
      reply.code(201).send(Board.toResponse(createdBoard));
    },
  });

  fastify.route({
    method: 'PUT',
    url: '/:boardId',
    async handler(request: IBoardRequest, reply) {
      const newBoard = new Board(request.body);
      await boardService.removeById(newBoard.id);
      const createdBoard = await boardService.addItem(newBoard);
      reply.send(Board.toResponse(createdBoard));
    },
  });

  fastify.route({
    method: 'DELETE',
    url: '/:boardId',
    async handler(request: IBoardRequest, reply) {
      await boardService.removeByIdWithConnectedTasks(request.params.boardId);
      reply.code(204).send();
    },
  });
}
