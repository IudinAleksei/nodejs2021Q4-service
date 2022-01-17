import { onRequestHookHandler } from 'fastify';

export const requestTokenValidator: onRequestHookHandler = (
  req,
  reply,
  done
) => {
  if (req.headers.authorization) {
    done();
  }
  done();
  // reply.code(401).send('Unauthorized error');
};
