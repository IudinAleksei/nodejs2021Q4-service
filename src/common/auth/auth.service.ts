import { onRequestHookHandler } from 'fastify';
import { compare, hash } from 'bcrypt';
import { getConnection } from 'typeorm';
import jwt from 'jsonwebtoken';
import {
  AUTH_METHOD,
  HASH_SALT,
  HTTP_ERRORS_INFO,
  UNAUTHORIZED_ACCESS_URL_LIST,
} from '../constants';
import { AuthData } from './auth.model';
import { User } from '../../resources/users/user.model';
import { ILoginData } from './auth.types';
import { CustomServerError } from '../errors';
import { JWT_SECRET_KEY } from '../config';

const validateToken = (token: string): boolean => {
  try {
    jwt.verify(token, JWT_SECRET_KEY);
    return true;
  } catch {
    return false;
  }
};

const hasUnauthAccess = (url: string): boolean => {
  const startPath = url.split('/')[1];
  return UNAUTHORIZED_ACCESS_URL_LIST.includes(startPath);
};

const hasValidAuthHeader = (header?: string): boolean => {
  if (!header) {
    return false;
  }
  const [method, token] = header.split(' ');
  const isMethodCorrect = method === AUTH_METHOD;
  return isMethodCorrect && validateToken(token);
};

export const requestTokenValidator: onRequestHookHandler = (req, _, done) => {
  if (
    hasUnauthAccess(req.url) ||
    hasValidAuthHeader(req.headers.authorization)
  ) {
    done();
    return;
  }
  throw new CustomServerError(HTTP_ERRORS_INFO.unauthorized);
};

export const getPasswordHash = async (password: string): Promise<string> => {
  return hash(password, HASH_SALT);
};

const isPasswordValid = async (
  password: string,
  passwordHash: string
): Promise<boolean> => {
  return compare(password, passwordHash);
};

const findUserByLogin = async (login: string): Promise<User | undefined> => {
  const userRepo = getConnection().getRepository(User);
  return userRepo.findOne({ login });
};

const saveAuthData = async (user: User, token: string): Promise<AuthData> => {
  const authRepo = getConnection().getRepository(AuthData);
  const authData = authRepo.create({ ...user, token });
  return authRepo.save(authData);
};

const createToken = async (user: User): Promise<string> => {
  const payload = {
    userId: user.id,
    login: user.login,
  };
  return jwt.sign(payload, JWT_SECRET_KEY);
};

export const authorize = async (
  loginData: ILoginData
): Promise<string> | never => {
  const user = await findUserByLogin(loginData.login);
  if (user && (await isPasswordValid(loginData.password, user.password))) {
    const token = await createToken(user);
    const authData = await saveAuthData(user, token);
    return authData.token;
  }
  throw new CustomServerError(HTTP_ERRORS_INFO.forbidden);
};
