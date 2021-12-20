import fastify, { FastifyInstance } from 'fastify';
import fastifySwagger, { FastifyStaticSwaggerOptions } from 'fastify-swagger';
import { currentDirname } from './common/config';

import { userRoutes } from './resources/users/user.router';
import { boardRoutes } from './resources/boards/board.router';
import { taskRoutes } from './resources/tasks/task.router';

/**
 * @remarks This method create fastify application instance {@link FastifyInstance}
 */
export const app: FastifyInstance = fastify({
  logger: {
    prettyPrint: true,
    level: 'info',
    file: 'src/logs/log.txt',
    serializers: {
      res(reply) {
        // The default
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
          // Including the headers in the log could be in violation
          // of privacy laws, e.g. GDPR. You should use the "redact" option to
          // remove sensitive fields. It could also leak authentication data in
          // the logs.
          headers: request.headers,
        };
      },
    },
  },
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
