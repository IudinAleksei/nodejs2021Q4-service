import { FastifyInstance } from 'fastify';
import { Task } from './task.model';
import { taskService } from './task.service';
import { TaskRequest } from './task.types';

/**
 * Async function register routes for {@link Task}
 * @param fastify - an instance of the application {@link FastifyInstance} used to register routes
 */
export async function taskRoutes(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/',
    /**
     * This handler get all tasks from database, respond with code 200 and tasks array transformed {@link Task.toResponse} method
     *
     * @param reply - is a core Fastify object provides access to the context of the request
     */
    async handler(_, reply) {
      const tasks = await taskService.getAll();
      reply.send(tasks.map(Task.toResponse));
    },
  });

  fastify.route({
    method: 'GET',
    url: '/:taskId',
    /**
     * This handler get task with passed id from database, respond with code 200 and this task transformed {@link Task.toResponse} method
     *
     * @param request -  is a core Fastify object
     * @param reply - is a core Fastify object provides access to the context of the request
     */
    async handler(request: TaskRequest, reply) {
      const task = await taskService.getById(request.params.taskId);
      reply.send(Task.toResponse(task));
    },
  });

  fastify.route({
    method: 'POST',
    url: '/',
    /**
     * This handler add passed task data to database, respond with code 201 and added task transformed {@link Task.toResponse} method
     *
     * @param request -  is a core Fastify object
     * @param reply - is a core Fastify object provides access to the context of the request
     */
    async handler(request: TaskRequest, reply) {
      const newTask = new Task({
        ...request.body,
        boardId: request.body.boardId || request.params.boardId,
      });
      const createdTask = await taskService.addItem(newTask);
      reply.code(201).send(Task.toResponse(createdTask));
    },
  });

  fastify.route({
    method: 'PUT',
    url: '/:taskId',
    /**
     * This handler update passed task in database, respond with code 200 and updated task transformed {@link Task.toResponse} method
     *
     * @param request -  is a core Fastify object
     * @param reply - is a core Fastify object provides access to the context of the request
     */
    async handler(request: TaskRequest, reply) {
      const task = new Task({
        ...request.body,
        boardId: request.body.boardId || request.params.boardId,
      });
      const updatedTask = await taskService.updateItem(task);
      reply.send(Task.toResponse(updatedTask));
    },
  });

  fastify.route({
    method: 'DELETE',
    url: '/:taskId',
    /**
     * This handler delete task with passed id from database and respond with code 204
     *
     * @param request -  is a core Fastify object
     * @param reply - is a core Fastify object provides access to the context of the request
     */
    async handler(request: TaskRequest, reply) {
      await taskService.removeById(request.params.taskId);
      reply.code(204).send();
    },
  });
}
