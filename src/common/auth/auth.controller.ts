import { onRequestHookHandler } from 'fastify';
import { HTTP_ERRORS_INFO } from '../constants';
import { ILoginData } from './auth.types';
import { CustomServerError } from '../errors';
import {
  createToken,
  findUserByLogin,
  hasUnauthAccess,
  hasValidAuthHeader,
  isPasswordValid,
} from './auth.service';

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

export const authorize = async (
  loginData: ILoginData
): Promise<string> | never => {
  const user = await findUserByLogin(loginData.login);
  if (user && (await isPasswordValid(loginData.password, user.password))) {
    return createToken(user);
  }
  throw new CustomServerError(HTTP_ERRORS_INFO.forbidden);
};
