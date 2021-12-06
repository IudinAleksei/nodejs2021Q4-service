import { FastifyRequest } from 'fastify';
import { RouteGenericInterface } from 'fastify/types/route';
import { User } from './user.model';

export interface IUserRoute extends RouteGenericInterface {
  Body: User;
  Params: { userId: string };
}

export type IUserRequest = FastifyRequest<IUserRoute>;
