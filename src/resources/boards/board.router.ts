import { FastifyInstance } from 'fastify';
import { Board } from './board.model';
import { boardService } from './board.service';
import { BoardRequest } from './board.types';

/**
 * Async function register routes for {@link Board}
 * @param fastify - an instance of the application {@link FastifyInstance} used to register routes
 */
export async function boardRoutes(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/',
    /**
     * This handler get all boards from database, respond with code 200 and board array transformed {@link Board.toResponse} method
     *
     * @param reply - is a core Fastify object provides access to the context of the request
     */
    async handler(_, reply) {
      const boards = await boardService.getAll();
      reply.send(boards.map(Board.toResponse));
    },
  });

  fastify.route({
    method: 'GET',
    url: '/:boardId',
    /**
     * This handler get board with passed id from database, respond with code 200 and this board transformed {@link Board.toResponse} method
     *
     * @param request -  is a core Fastify object
     * @param reply - is a core Fastify object provides access to the context of the request
     */
    async handler(request: BoardRequest, reply) {
      const board = await boardService.getById(request.params.boardId);
      reply.send(Board.toResponse(board));
    },
  });

  fastify.route({
    method: 'POST',
    url: '/',
    /**
     * This handler add passed board data to database, respond with code 201 and added board transformed {@link Board.toResponse} method
     *
     * @param request -  is a core Fastify object
     * @param reply - is a core Fastify object provides access to the context of the request
     */
    async handler(request: BoardRequest, reply) {
      const newBoard = request.body;
      const createdBoard = await boardService.addItem(newBoard);
      reply.code(201).send(Board.toResponse(createdBoard));
    },
  });

  fastify.route({
    method: 'PUT',
    url: '/:boardId',
    /**
     * This handler update passed board in database, respond with code 200 and updated board transformed {@link Board.toResponse} method
     *
     * @param request -  is a core Fastify object
     * @param reply - is a core Fastify object provides access to the context of the request
     */
    async handler(request: BoardRequest, reply) {
      const newBoard = request.body;
      const updatedBoard = await boardService.updateItem(newBoard);
      reply.send(Board.toResponse(updatedBoard));
    },
  });

  fastify.route({
    method: 'DELETE',
    url: '/:boardId',
    /**
     * This handler delete board with passed id from database and respond with code 204
     *
     * @param request -  is a core Fastify object
     * @param reply - is a core Fastify object provides access to the context of the request
     */
    async handler(request: BoardRequest, reply) {
      await boardService.removeByIdWithConnectedTasks(request.params.boardId);
      reply.code(204).send();
    },
  });
}
