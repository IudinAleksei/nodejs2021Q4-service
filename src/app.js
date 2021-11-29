// const express = require('express');
// const userRouter = require('./resources/users/user.router');
const fastify = require('fastify')();
const fastifySwagger = require('fastify-swagger');

// app.use('/users', userRouter);
fastify.addContentTypeParser(
  'application/json',
  { parseAs: 'string' },
  (req, body, done) => {
    try {
      const json = JSON.parse(body);
      done(null, json);
    } catch (err) {
      err.statusCode = 400;
      done(err, undefined);
    }
  }
);

fastify.get('/', async () => ({ hello: 'world' }));
// fastify.use('/users', userRouter);

fastify.register(fastifySwagger, {
  routePrefix: '/doc',
  mode: 'static',
  specification: {
    path: 'doc/api.yaml',
  },
  exposeRoute: true,
});

module.exports = fastify;
