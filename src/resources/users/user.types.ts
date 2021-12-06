import { FastifyRequest } from 'fastify';
import { RouteGenericInterface } from 'fastify/types/route';

export interface IUserRoute extends RouteGenericInterface {
  Body: IUser;
  Params: { userId: string };
}

export type UserRequest = FastifyRequest<IUserRoute>;

export interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}
