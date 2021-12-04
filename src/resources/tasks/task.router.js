const Task = require('./task.model');
const tasksService = require('./task.service');

async function routes(fastify) {
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
      const newTask = new Task({
        ...request.body,
        boardId: request.body.boardId || request.params.boardId,
      });
      const createdTask = await tasksService.addItem(newTask);
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
      await tasksService.removeById(task.id);
      const updatedTask = await tasksService.addItem(task);
      reply.send(Task.toResponse(updatedTask));
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
