import fastify, { FastifyInstance } from 'fastify';
import fastifySwagger, { FastifyStaticSwaggerOptions } from 'fastify-swagger';
import { currentDirname } from './common/config';

import { userRoutes } from './resources/users/user.router';
import { boardRoutes } from './resources/boards/board.router';
import { taskRoutes } from './resources/tasks/task.router';
import { CustomServerError } from './common/errors';

/**
 * @remarks This method create fastify application instance {@link FastifyInstance}
 */
export const app: FastifyInstance = fastify();

/**
 * @remarks This method add body content parser for json, handle parse error and create {@link CustomServerError}
 * for wrong JSON body
 */
app.addContentTypeParser(
  'application/json',
  { parseAs: 'string' },
  (req, body, done) => {
    try {
      const json = JSON.parse(body.toString());
      done(null, json);
    } catch (err) {
      const catchedError = new CustomServerError({
        statusCode: 400,
        message: (err as Error).message,
      });
      done(catchedError, undefined);
    }
  }
);

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
