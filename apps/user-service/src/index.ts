import { env } from '@/configs/env';
import { closeRedisConnection, getRedisClient } from '@repo/redis';
import { app } from '@/server';
import { logger } from '@/utils/logger';
import { userMessagingService } from '@/services/messaging.service';

import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod/v4';

extendZodWithOpenApi(z);

const server = app.listen(env.PORT, async () => {
  const { NODE_ENV, HOST, PORT } = env;
  logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);

  // Initialize Redis connection
  getRedisClient();

  // Initialize messaging service
  try {
    await userMessagingService.connect();
    await userMessagingService.setupConsumers();
    logger.info('Messaging service initialized successfully');
  } catch (error) {
    logger.error('Failed to initialize messaging service', error);
  }
});

const onCloseSignal = async () => {
  logger.info('sigint received, shutting down');

  try {
    await userMessagingService.disconnect();
    logger.info('Messaging service disconnected');
  } catch (error) {
    logger.error('Error disconnecting messaging service', error);
  }

  await closeRedisConnection();
  server.close(() => {
    logger.info('server closed');
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
};

process.on('SIGINT', onCloseSignal);
process.on('SIGTERM', onCloseSignal);
