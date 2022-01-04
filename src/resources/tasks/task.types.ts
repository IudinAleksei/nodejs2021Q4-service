import { FastifyRequest } from 'fastify';
import { RouteGenericInterface } from 'fastify/types/route';
import { Task } from './task.model';

export interface ITaskRoute extends RouteGenericInterface {
  Body: Task;
  Params: { boardId: string; taskId: string };
}

export type TaskRequest = FastifyRequest<ITaskRoute>;
