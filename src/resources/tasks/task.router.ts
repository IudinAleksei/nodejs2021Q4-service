import { FastifyInstance } from 'fastify';
import { Task } from './task.model';
import { taskService } from './task.service';

export async function taskRoutes(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/',
    async handler(request, reply) {
      const tasks = await taskService.getAll();
      reply.send(tasks.map(Task.toResponse));
    },
  });

  fastify.route({
    method: 'GET',
    url: '/:taskId',
    async handler(request, reply) {
      const task = await taskService.getById(request.params.taskId);
      reply.send(Task.toResponse(task));
    },
  });

  fastify.route({
    method: 'POST',
    url: '/',
    async handler(request, reply) {
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
    async handler(request, reply) {
      const task = new Task({
        ...request.body,
        boardId: request.body.boardId || request.params.boardId,
      });
      await taskService.removeById(task.id);
      const updatedTask = await taskService.addItem(task);
      reply.send(Task.toResponse(updatedTask));
    },
  });

  fastify.route({
    method: 'DELETE',
    url: '/:taskId',
    async handler(request, reply) {
      await taskService.removeById(request.params.taskId);
      reply.code(204).send();
    },
  });
}
