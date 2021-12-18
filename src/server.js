const fastify = require('./app');
const { PORT } = require('./common/config');

const start = async () => {
  try {
    await fastify.listen(PORT);

    console.log(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
