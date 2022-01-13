import dotenv from 'dotenv';
import path, { dirname } from 'path';
import pino from 'pino';
import { ConnectionOptions } from 'typeorm';
import { fileURLToPath } from 'url';

export const currentDirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: path.join(currentDirname, '../../.env'),
});

export const PORT = process.env.PORT || 3000;
export const LOG_LEVEL: pino.LevelWithSilent =
  (process.env.LOG_LEVEL as pino.LevelWithSilent) || 'debug';
export const { NODE_ENV } = process.env;
export const { JWT_SECRET_KEY } = process.env;
export const AUTH_MODE = process.env.AUTH_MODE === 'true';
const POSTGRES_PORT = parseInt(process.env.POSTGRES_PORT || '3001', 10);

export const TYPEORM_CONNECTION_OPTIONS: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [],
  synchronize: false,
  logging: false,
};
