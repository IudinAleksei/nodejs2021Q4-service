import { FastifyInstance } from 'fastify';
import { ILoginData } from './auth.types';
import { authorize } from './auth.controller';

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
      const token = await authorize(request.body as ILoginData);
      reply.send({ token });
    },
  });
}
