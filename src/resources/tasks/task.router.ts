import { FastifyInstance } from 'fastify';
import { HTTP_ERRORS_INFO } from '../../common/constants';
import { CustomServerError } from '../../common/errors';
import { Task } from './task.model';
import { taskService } from './task.service';
import { TaskRequest } from './task.types';

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
    async handler(request: TaskRequest, reply) {
      const task = await taskService.getById(request.params.taskId);
      reply.send(Task.toResponse(task));
    },
  });

  fastify.route({
    method: 'POST',
    url: '/',
    async handler(request: TaskRequest, reply) {
      const newTask = new Task({
        ...request.body,
        boardId: request.body.boardId || request.params.boardId,
      });
      const createdTask = await taskService.addItem(newTask);
      if (createdTask) {
        reply.code(201).send(Task.toResponse(createdTask));
      }
      throw new CustomServerError(HTTP_ERRORS_INFO.db);
    },
  });

  fastify.route({
    method: 'PUT',
    url: '/:taskId',
    async handler(request: TaskRequest, reply) {
      const task = new Task({
        ...request.body,
        boardId: request.body.boardId || request.params.boardId,
      });
      await taskService.removeById(task.id);
      const updatedTask = await taskService.addItem(task);
      if (updatedTask) {
        reply.send(Task.toResponse(updatedTask));
      }
      throw new CustomServerError(HTTP_ERRORS_INFO.db);
    },
  });

  fastify.route({
    method: 'DELETE',
    url: '/:taskId',
    async handler(request: TaskRequest, reply) {
      await taskService.removeById(request.params.taskId);
      reply.code(204).send();
    },
  });
}
