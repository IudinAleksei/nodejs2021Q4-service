import { FastifyInstance } from 'fastify';
import { CustomServerError } from '../errors';
import { HTTP_ERRORS_INFO } from '../constants';

/**
 * @param fastify - an instance of the application {@link FastifyInstance} used to register routes
 */
export async function authRoutes(fastify: FastifyInstance) {
  fastify.route({
    method: 'POST',
    url: '/',
    /**
     * This handler
     *
     * @param request -  is a core Fastify object
     * @param reply - is a core Fastify object provides access to the context of the request
     */
    async handler(request, reply) {
      if (request.body) {
        reply.code(201).header('Authorization', 'Bearer <jwt>').send();
      }
      reply.code(403).send();
    },
  });
}
