import { env } from '@/configs/env';
import { closeRedisConnection, getRedisClient } from '@repo/redis';
import { app } from '@/server';
import { logger } from '@/utils/logger';

import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod/v4';

extendZodWithOpenApi(z);

const server = app.listen(env.PORT, async () => {
  const { NODE_ENV, HOST, PORT } = env;
  logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);

  // Initialize Redis connection
  getRedisClient();
});

const onCloseSignal = async () => {
  logger.info('sigint received, shutting down');

  await closeRedisConnection();
  server.close(() => {
    logger.info('server closed');
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
};

process.on('SIGINT', onCloseSignal);
process.on('SIGTERM', onCloseSignal);
