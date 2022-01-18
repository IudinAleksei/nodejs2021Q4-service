import { ICustomErrorInfo } from './common.types';

export const USED_UUID_VERSION = 4;

export const HASH_SALT = 10;

export const HTTP_ERRORS_INFO: Record<string, ICustomErrorInfo> = Object.freeze(
  {
    invalidPersonData: { statusCode: 400, message: 'Incorrect data' },
    invalidId: { statusCode: 400, message: 'ID not valid' },
    unauthorized: {
      statusCode: 401,
      message: 'Unauthorized request',
    },
    forbidden: {
      statusCode: 403,
      message: 'Forbidden: Incorrect login/password',
    },
    notFound: { statusCode: 404, message: 'Item with this id not found' },
    server: { statusCode: 500, message: 'Server error, please try later' },
    db: { statusCode: 500, message: 'Database error, please try later' },
    methodNotImplemented: {
      statusCode: 501,
      message: 'HTTP method not implementes on this route',
    },
  }
);

export const ADMIN_USER = Object.freeze({
  name: 'admin',
  login: 'admin',
  password: 'admin',
});
