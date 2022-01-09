import 'reflect-metadata';
import { AddressInfo } from 'net';
import { exit } from 'process';

import { app } from './app';

import { PORT } from './common/config';
import { logger } from './common/logger';

/**
 * Async function that start application on {@link PORT} from config file
 * and handle errors
 */

const start = async () => {
  try {
    await app.listen(PORT, '0.0.0.0');
    const runningPort = (app.server.address() as AddressInfo).port;

    logger.info(`server listening on ${runningPort}`);
  } catch (err) {
    logger.fatal(err);
    exit(1);
  }
};

process.on('unhandledRejection', (reason) => {
  logger.fatal(reason);
  exit(1);
});

process.on('uncaughtException', (error) => {
  logger.fatal(error);
  exit(1);
});

start();
