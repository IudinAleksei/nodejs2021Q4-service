import { FastifyReply, FastifyRequest } from 'fastify';
import { ICustomErrorInfo } from './common.types';
import { HTTP_ERRORS_INFO } from './constants';
import { logger } from './logger';

/**
 * @remarks class CustomServerError extends {@link Error} with statusCode using for http response code
 */
export class CustomServerError extends Error {
  statusCode: number;

  /**
   * Returns item with corresponding id from database.
   *
   * @param statusCode - HTTP request code
   * @param message - Default {@link Error} class message
   *
   * @defaultValue {@link HTTP_ERRORS_INFO.server} with statusCode 500
   */
  constructor(
    { statusCode, message }: ICustomErrorInfo = HTTP_ERRORS_INFO.server
  ) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

export const CustomErrorHandler = (
  error: Error,
  _: FastifyRequest,
  reply: FastifyReply
) => {
  const internal: CustomServerError =
    error instanceof CustomServerError ? error : new CustomServerError();
  if (internal.statusCode === 500) logger.error(internal);
  reply.status(internal.statusCode).send(internal.message);
};
