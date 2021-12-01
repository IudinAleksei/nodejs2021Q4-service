const Task = require('./task.model');
const tasksService = require('./task.service');

async function routes(fastify, options) {
  fastify.route({
    method: 'GET',
    url: '/',
    async handler(request, reply) {
      const tasks = await tasksService.getAll();
      reply.send(tasks.map(Task.toResponse));
    },
  });

  fastify.route({
    method: 'GET',
    url: '/:taskId',
    async handler(request, reply) {
      const task = await tasksService.getById(request.params.taskId);
      reply.send(Task.toResponse(task));
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
    url: '/:taskId',
    async handler(request, reply) {
      return 'PUT';
    },
  });

  fastify.route({
    method: 'DELETE',
    url: '/:taskId',
    async handler(request, reply) {
      await tasksService.removeById(request.params.taskId);
      reply.code(204).send();
    },
  });
}

module.exports = routes;
