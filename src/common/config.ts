import dotenv from 'dotenv';
import path, { dirname } from 'path';
import pino from 'pino';
import { fileURLToPath } from 'url';

export const currentDirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: path.join(currentDirname, '../../.env'),
});

export const PORT = process.env.PORT || 3000;
export const LOG_LEVEL: pino.LevelWithSilent =
  (process.env.LOG_LEVEL as pino.LevelWithSilent) || 'debug';
export const { NODE_ENV } = process.env;
export const { MONGO_CONNECTION_STRING } = process.env;
export const { JWT_SECRET_KEY } = process.env;
export const AUTH_MODE = process.env.AUTH_MODE === 'true';
