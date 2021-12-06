import { FastifyInstance } from 'fastify';
import { CustomServerError } from '../../common/errors';
import { HTTP_ERRORS_INFO } from '../../common/constants';
import { User } from './user.model';
import { userService } from './user.service';
import { IUserRequest } from './user.types';

export async function userRoutes(fastify: FastifyInstance) {
  fastify.route({
    method: 'GET',
    url: '/',
    async handler(request, reply) {
      const users = await userService.getAll();
      reply.send(users.map(User.toResponse));
    },
  });

  fastify.route({
    method: 'GET',
    url: '/:userId',
    async handler(request: IUserRequest, reply) {
      const user = await userService.getById(request.params.userId);
      reply.send(User.toResponse(user));
    },
  });

  fastify.route({
    method: 'POST',
    url: '/',
    async handler(request: IUserRequest, reply) {
      const newUser = new User(request.body);
      const createdUser = await userService.addItem(newUser);
      reply.code(201).send(User.toResponse(createdUser));
    },
  });

  fastify.route({
    method: 'PUT',
    url: '/:userId',
    async handler(request: IUserRequest, reply) {
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
    async handler(request: IUserRequest, reply) {
      await userService.removeByIdAndUnassignConnectedTasks(
        request.params.userId
      );
      reply.code(204).send();
    },
  });
}
