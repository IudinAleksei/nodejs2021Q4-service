import { ICustomErrorInfo } from './common.types';
import { HTTP_ERRORS_INFO } from './constants';

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
