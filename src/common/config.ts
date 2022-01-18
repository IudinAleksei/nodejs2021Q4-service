import dotenv from 'dotenv';
import path, { dirname } from 'path';
import pino from 'pino';
import { ConnectionOptions } from 'typeorm';
import { fileURLToPath } from 'url';

import { AuthData } from './auth/auth.model';
import { CreateAuthTable1642321903527 } from '../migrations/CreateAuthTable';
import { CreateTaskTable1642321903527 } from '../migrations/CreateTaskTable';
import { CreateBoardTable1642321903527 } from '../migrations/CreateBoardTable';
import { CreateUserTable1642321903527 } from '../migrations/CreateUserTable';
import { Board } from '../resources/boards/board.model';
import { Task } from '../resources/tasks/task.model';
import { User } from '../resources/users/user.model';

export const currentDirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({
  path: path.join(currentDirname, '../../.env'),
});

export const PORT = process.env.PORT || 3000;
export const LOG_LEVEL: pino.LevelWithSilent =
  (process.env.LOG_LEVEL as pino.LevelWithSilent) || 'debug';
export const { NODE_ENV } = process.env;
export const { JWT_SECRET_KEY = 'secret' } = process.env;
export const AUTH_MODE = process.env.AUTH_MODE === 'true';
const PGPORT = parseInt(process.env.PGPORT || '3001', 10);

export const TYPEORM_CONNECTION_OPTIONS: ConnectionOptions = {
  type: 'postgres',
  host: 'postgres',
  port: PGPORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [User, Task, Board, AuthData],
  migrations: [
    CreateUserTable1642321903527,
    CreateTaskTable1642321903527,
    CreateBoardTable1642321903527,
    CreateAuthTable1642321903527,
  ],
  migrationsRun: true,
  synchronize: false,
  logging: false,
};
