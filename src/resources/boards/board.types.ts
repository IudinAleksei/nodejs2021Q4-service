import { FastifyRequest } from 'fastify';
import { RouteGenericInterface } from 'fastify/types/route';
import { Board } from './board.model';

export interface IBoardRoute extends RouteGenericInterface {
  Body: Board;
  Params: { boardId: string };
}

export type IBoardRequest = FastifyRequest<IBoardRoute>;
