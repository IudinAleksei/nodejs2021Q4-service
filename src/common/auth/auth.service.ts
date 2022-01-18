import { onRequestHookHandler } from 'fastify';
import { compare, hash } from 'bcrypt';
import { getConnection } from 'typeorm';
import { AuthData } from './auth.model';
import { User } from '../../resources/users/user.model';
import { ILoginData } from './auth.types';
import { HASH_SALT, HTTP_ERRORS_INFO } from '../constants';
import { CustomServerError } from '../errors';

export const requestTokenValidator: onRequestHookHandler = (
  req,
  reply,
  done
) => {
  if (req.headers.authorization) {
    console.log(req.headers.authorization);
    done();
  }
  done();
  // throw new CustomServerError(HTTP_ERRORS_INFO.unauthorized);
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

export const authorize = async (
  loginData: ILoginData
): Promise<string> | never => {
  const userRepo = getConnection().getRepository(User);
  const user = await userRepo.findOne(loginData.login);
  if (user && (await isPasswordValid(loginData.password, user.password))) {
    const token = 'token';
    const authRepo = getConnection().getRepository(AuthData);
    const authData = authRepo.create({ ...user, token });
    const authDataFromDB = await authRepo.save(authData);
    return authDataFromDB.token;
  }
  throw new CustomServerError(HTTP_ERRORS_INFO.forbidden);
};
