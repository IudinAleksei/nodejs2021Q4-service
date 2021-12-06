import fastify from 'fastify';
import fastifySwagger, { FastifyStaticSwaggerOptions } from 'fastify-swagger';
import { currentDirname } from './common/config';

import { userRoutes } from './resources/users/user.router';
import { boardRoutes } from './resources/boards/board.router';
import { taskRoutes } from './resources/tasks/task.router';
import { CustomServerError } from './common/errors';

export const app = fastify();

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

app.register(userRoutes, { prefix: '/users' });
app.register(boardRoutes, { prefix: '/boards' });
app.register(taskRoutes, { prefix: '/boards/:boardId/tasks' });

const SwaggerOptions: FastifyStaticSwaggerOptions = {
  routePrefix: '/doc',
  mode: 'static',
  specification: {
    path: 'doc/api.yaml',
    baseDir: currentDirname,
  },
  exposeRoute: true,
};

app.register(fastifySwagger, SwaggerOptions);
