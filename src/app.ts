import fastify, { FastifyInstance } from 'fastify';
import fastifySwagger, { FastifyStaticSwaggerOptions } from 'fastify-swagger';
import { currentDirname } from './common/config';

import { userRoutes } from './resources/users/user.router';
import { boardRoutes } from './resources/boards/board.router';
import { taskRoutes } from './resources/tasks/task.router';
import { logger, requestBodyLogger } from './common/logger';
import { authRoutes } from './common/auth/auth.router';
import { requestTokenValidator } from './common/auth/auth.controller';

/**
 * @remarks This method create fastify application instance {@link FastifyInstance}
 */
export const app: FastifyInstance = fastify({ logger });

/**
 * @remarks This method add logger for request body
 */
app.addHook('preHandler', requestBodyLogger);
/**
 * @remarks This method add JWT validator for request
 */
app.addHook('onRequest', requestTokenValidator);

/**
 * @remarks This method register auth routes
 */
app.register(authRoutes, { prefix: '/login' });

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
