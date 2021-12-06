import { exit } from 'process';

import { app } from './app';

import { PORT } from './common/config';

const start = async () => {
  try {
    await app.listen(PORT);
    console.log('app2');

    // console.log(`server listening on ${app.server.address().port}`);
  } catch (err) {
    console.error(err);
    exit(1);
  }
};

start();
