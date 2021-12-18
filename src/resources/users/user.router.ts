import { FastifyInstance } from 'fastify';
import { CustomServerError } from '../../common/errors';
import { HTTP_ERRORS_INFO } from '../../common/constants';
import { User } from './user.model';
import { userService } from './user.service';
import { UserRequest } from './user.types';

/**
 * Async function register routes for {@link User}
 * @param fastify - an instance of the application {@link FastifyInstance} used to register routes
 */
export async function userRoutes(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/',
    /**
     * This handler get all users from database, respond with code 200 and user array transformed {@link User.toResponse} method
     *
     * @param reply - is a core Fastify object provides access to the context of the request
     */
    async handler(_, reply) {
      const users = await userService.getAll();
      reply.send(users.map(User.toResponse));
    },
  });

  fastify.route({
    method: 'GET',
    url: '/:userId',
    /**
     * This handler get user with passed id from database, respond with code 200 and this user transformed {@link User.toResponse} method
     *
     * @param request -  is a core Fastify object
     * @param reply - is a core Fastify object provides access to the context of the request
     */
    async handler(request: UserRequest, reply) {
      const user = await userService.getById(request.params.userId);
      reply.send(User.toResponse(user));
    },
  });

  fastify.route({
    method: 'POST',
    url: '/',
    /**
     * This handler add passed user data to database, respond with code 201 and added user transformed {@link User.toResponse} method
     *
     * @param request -  is a core Fastify object
     * @param reply - is a core Fastify object provides access to the context of the request
     */
    async handler(request: UserRequest, reply) {
      const newUser = new User(request.body);
      const createdUser = await userService.addItem(newUser);
      reply.code(201).send(User.toResponse(createdUser));
    },
  });

  fastify.route({
    method: 'PUT',
    url: '/:userId',
    /**
     * This handler update passed user in database, respond with code 200 and updated user transformed {@link User.toResponse} method
     *
     * @param request -  is a core Fastify object
     * @param reply - is a core Fastify object provides access to the context of the request
     */
    async handler(request: UserRequest, reply) {
      if (request.body.id !== request.params.userId) {
        throw new CustomServerError(HTTP_ERRORS_INFO.invalidId);
      }
      const user = new User(request.body);
      await userService.removeById(user.id);
      const updatedUser = await userService.addItem(user);
      reply.send(User.toResponse(updatedUser));
    },
  });

  fastify.route({
    method: 'DELETE',
    url: '/:userId',
    /**
     * This handler delete user with passed id from database and respond with code 204
     *
     * @param request -  is a core Fastify object
     * @param reply - is a core Fastify object provides access to the context of the request
     */
    async handler(request: UserRequest, reply) {
      await userService.removeByIdAndUnassignConnectedTasks(
        request.params.userId
      );
      reply.code(204).send();
    },
  });
}
