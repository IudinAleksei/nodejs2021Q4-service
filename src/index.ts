import { AddressInfo } from 'net';
import { exit } from 'process';

import { app } from './app';

import { PORT } from './common/config';

/**
 * Async function that start application on PORT from config file
 * and handle errors
 */

const start = async () => {
  try {
    await app.listen(PORT);
    const runningPort = (app.server.address() as AddressInfo).port;

    console.log(`server listening on ${runningPort}`);
  } catch (err) {
    console.error(err);
    exit(1);
  }
};

start();
