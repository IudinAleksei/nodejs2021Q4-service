import { AddressInfo } from 'net';
import { exit } from 'process';

import { app } from './app';

import { PORT } from './common/config';

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
