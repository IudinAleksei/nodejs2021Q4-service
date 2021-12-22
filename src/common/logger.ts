import { preHandlerHookHandler } from 'fastify';
import { LoggerOptions, pino, TransportMultiOptions } from 'pino';
import { LOG_LEVEL } from './config';

const TRANSPORT_CONFIG: TransportMultiOptions = {
  targets: [
    {
      level: LOG_LEVEL,
      target: 'pino-pretty',
      options: {
        destination: 'src/logs/info.log',
        colorize: false,
        translateTime: true,
      },
    },
    {
      level: 'error',
      target: 'pino-pretty',
      options: {
        destination: 'src/logs/errors.log',
        colorize: false,
        translateTime: true,
      },
    },
  ],
};

const LOGGER_CONFIG: LoggerOptions = {
  transport: TRANSPORT_CONFIG,
  level: LOG_LEVEL,
  serializers: {
    res(reply) {
      return {
        statusCode: reply.statusCode,
      };
    },
    req(request) {
      return {
        method: request.method,
        url: request.url,
        path: request.routerPath,
        parameters: request.params,
        queryParams: request.query,
      };
    },
  },
};

export const logger = pino(LOGGER_CONFIG);

export const requestBodyLogger: preHandlerHookHandler = (req, _, done) => {
  if (req.body) {
    req.log.debug({ body: req.body }, 'parsed body');
  }
  done();
};
