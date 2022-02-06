export const USED_UUID_VERSION = 4;

export const AUTH_METHOD = 'Bearer';

export const HASH_SALT = 10;

export const ADMIN_USER = Object.freeze({
  name: 'admin',
  login: 'admin',
  password: 'admin',
});

export const UNAUTHORIZED_ACCESS_URL_LIST: readonly string[] = Object.freeze([
  'login',
  'doc',
  '',
]);

export const PrismaError = Object.freeze({
  RecordDoesNotExist: 'P2025',
});
