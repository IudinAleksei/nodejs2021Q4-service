import fastify, { FastifyInstance } from 'fastify';
import fastifySwagger, { FastifyStaticSwaggerOptions } from 'fastify-swagger';
import { currentDirname, LOG_LEVEL } from './common/config';

import { userRoutes } from './resources/users/user.router';
import { boardRoutes } from './resources/boards/board.router';
import { taskRoutes } from './resources/tasks/task.router';

/**
 * @remarks This method create fastify application instance {@link FastifyInstance}
 */
export const app: FastifyInstance = fastify({
  logger: {
    prettyPrint: true,
    level: LOG_LEVEL,
    file: 'src/logs/log.txt',
    serializers: {
      res(reply) {
        return {
          statusCode: reply.statusCode,
        };
      },
      req(request) {
        return {
          method: request.method,
          url: request.url,
          path: request.routerPath,
          parameters: request.params,
          queryParams: request.query,
        };
      },
    },
  },
});

app.addHook('preHandler', function (req, _, done) {
  if (req.body) {
    req.log.info({ body: req.body }, 'parsed body');
  }
  done();
});

app.setErrorHandler(function (error, request, reply) {
  // Log error
  this.log.error(error);
  // Send error response
  reply.status(500).send({ ok: false });
});
/**
 * @remarks This method register user routes
 */
app.register(userRoutes, { prefix: '/users' });

/**
 * @remarks This method register board routes
 */
app.register(boardRoutes, { prefix: '/boards' });

/**
 * @remarks This method register task routes
 */
app.register(taskRoutes, { prefix: '/boards/:boardId/tasks' });

/**
 * @remarks Object with swagger config options
 */
const SwaggerOptions: FastifyStaticSwaggerOptions = {
  routePrefix: '/doc',
  mode: 'static',
  specification: {
    path: 'doc/api.yaml',
    baseDir: currentDirname,
  },
  exposeRoute: true,
};

/**
 * @remarks This method register swagger
 */
app.register(fastifySwagger, SwaggerOptions);
