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
    await app.listen(PORT);
    const runningPort = (app.server.address() as AddressInfo).port;

    logger.info(`server listening on ${runningPort}`);
  } catch (err) {
    logger.fatal(err);
    exit(1);
  }
};

process.on('unhandledRejection', (reason) => {
  logger.error(reason);
});

process.on('uncaughtException', (err) => {
  logger.fatal(err.message);
  exit(1);
});

start();
