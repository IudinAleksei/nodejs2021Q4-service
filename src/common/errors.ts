import { ICustomErrorInfo } from './common.types';
import { HTTP_ERRORS_INFO } from './constants';

export class CustomServerError extends Error {
  statusCode: number;

  constructor(
    { statusCode, message }: ICustomErrorInfo = HTTP_ERRORS_INFO.server
  ) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}
