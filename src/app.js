const fastify = require('fastify')();
const fastifySwagger = require('fastify-swagger');

const userRoutes = require('./resources/users/user.router');
const boardRoutes = require('./resources/boards/board.router');
const taskRoutes = require('./resources/tasks/task.router');

fastify.addContentTypeParser(
  'application/json',
  { parseAs: 'string' },
  (req, body, done) => {
    try {
      const json = JSON.parse(body);
      done(null, json);
    } catch (err) {
      err.statusCode = 400;
      done(err, undefined);
    }
  }
);

fastify.register(userRoutes, { prefix: '/users' });
fastify.register(boardRoutes, { prefix: '/boards' });
fastify.register(taskRoutes, { prefix: '/boards/:boardId/tasks' });

fastify.register(fastifySwagger, {
  routePrefix: '/doc',
  mode: 'static',
  specification: {
    path: 'doc/api.yaml',
  },
  exposeRoute: true,
});

module.exports = fastify;
