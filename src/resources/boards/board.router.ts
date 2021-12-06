import { FastifyInstance } from 'fastify';
import { HTTP_ERRORS_INFO } from '../../common/constants';
import { CustomServerError } from '../../common/errors';
import { Board } from './board.model';
import { boardService } from './board.service';
import { BoardRequest } from './board.types';

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
    async handler(request: BoardRequest, reply) {
      const board = await boardService.getById(request.params.boardId);
      reply.send(Board.toResponse(board));
    },
  });

  fastify.route({
    method: 'POST',
    url: '/',
    async handler(request: BoardRequest, reply) {
      const newBoard = new Board(request.body);
      const createdBoard = await boardService.addItem(newBoard);
      if (createdBoard) {
        reply.code(201).send(Board.toResponse(createdBoard));
      }
      throw new CustomServerError(HTTP_ERRORS_INFO.db);
    },
  });

  fastify.route({
    method: 'PUT',
    url: '/:boardId',
    async handler(request: BoardRequest, reply) {
      const newBoard = new Board(request.body);
      await boardService.removeById(newBoard.id);
      const updatedBoard = await boardService.addItem(newBoard);
      if (updatedBoard) {
        reply.send(Board.toResponse(updatedBoard));
      }
      throw new CustomServerError(HTTP_ERRORS_INFO.db);
    },
  });

  fastify.route({
    method: 'DELETE',
    url: '/:boardId',
    async handler(request: BoardRequest, reply) {
      await boardService.removeByIdWithConnectedTasks(request.params.boardId);
      reply.code(204).send();
    },
  });
}
