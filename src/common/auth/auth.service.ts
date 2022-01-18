import { onRequestHookHandler } from 'fastify';
import { compare, hash } from 'bcrypt';
import { getConnection } from 'typeorm';
import { AuthData } from './auth.model';
import { User } from '../../resources/users/user.model';
import { ILoginData } from './auth.types';
import {
  HASH_SALT,
  HTTP_ERRORS_INFO,
  UNAUTHORIZED_ACCESS_URL_LIST,
} from '../constants';
import { CustomServerError } from '../errors';

const validateToken = async (token: string): Promise<boolean> => {
  return true;
};

export const requestTokenValidator: onRequestHookHandler = (req, _, done) => {
  const startRoute = req.url.split('/')[1];
  if (
    req.headers.authorization === 'Bearer token' ||
    UNAUTHORIZED_ACCESS_URL_LIST.includes(startRoute)
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
  return user.id;
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
