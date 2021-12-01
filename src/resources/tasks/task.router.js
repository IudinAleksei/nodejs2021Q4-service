const Task = require('./task.model');
const tasksService = require('./task.service');

async function routes(fastify, options) {
  fastify.route({
    method: 'GET',
    url: '/',
    async handler(request, reply) {
      const tasks = await tasksService.getAll();
      return tasks.map(Task.toResponse);
    },
  });

  fastify.route({
    method: 'GET',
    url: '/:taskId',
    async handler(request, reply) {
      const task = await tasksService.getById(request.params.taskId);
      return Task.toResponse(task);
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
      return 'PUT';
    },
  });
}

module.exports = routes;
