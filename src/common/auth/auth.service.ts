import { compare, hash } from 'bcrypt';
import { getConnection } from 'typeorm';
import jwt from 'jsonwebtoken';
import {
  AUTH_METHOD,
  HASH_SALT,
  UNAUTHORIZED_ACCESS_URL_LIST,
} from '../constants';
import { AuthData } from './auth.model';
import { User } from '../../resources/users/user.model';
import { JWT_SECRET_KEY } from '../config';

const validateToken = (token: string): boolean => {
  try {
    jwt.verify(token, JWT_SECRET_KEY);
    return true;
  } catch {
    return false;
  }
};

export const hasUnauthAccess = (url: string): boolean => {
  const startPath = url.split('/')[1];
  return UNAUTHORIZED_ACCESS_URL_LIST.includes(startPath);
};

export const hasValidAuthHeader = (header?: string): boolean => {
  if (!header) {
    return false;
  }
  const [method, token] = header.split(' ');
  const isMethodCorrect = method === AUTH_METHOD;
  return isMethodCorrect && validateToken(token);
};

const hasTokenInDB = async (token: string): Promise<boolean> => {
  const authRepo = getConnection().getRepository(AuthData);
  const authData = await authRepo.findOne({ token });
  return Boolean(authData);
};

export const getPasswordHash = async (password: string): Promise<string> => {
  return hash(password, HASH_SALT);
};

export const isPasswordValid = async (
  password: string,
  passwordHash: string
): Promise<boolean> => {
  return compare(password, passwordHash);
};

export const findUserByLogin = async (
  login: string
): Promise<User | undefined> => {
  const userRepo = getConnection().getRepository(User);
  return userRepo.findOne({ login });
};

export const saveAuthData = async (
  user: User,
  token: string
): Promise<AuthData> => {
  const authRepo = getConnection().getRepository(AuthData);
  const authData = authRepo.create({ ...user, token });
  return authRepo.save(authData);
};

export const createToken = async (user: User): Promise<string> => {
  const payload = {
    userId: user.id,
    login: user.login,
  };
  return jwt.sign(payload, JWT_SECRET_KEY);
};
