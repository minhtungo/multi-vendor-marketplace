import { env } from '@/configs/env';
import { app } from '@/server';
import { logger } from '@packages/utils/logger';
import { createServer } from 'http';
import { getRedisClient, closeRedisConnection } from './lib/redis';

const httpServer = createServer(app);

const server = httpServer.listen(env.PORT, () => {
  const { NODE_ENV, HOST, PORT } = env;
  logger.info(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);

  // Initialize Redis connection
  getRedisClient();
});

const shutdown = async () => {
  logger.info('Shutting down server...');

  // Close Redis connection
  await closeRedisConnection();

  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
};

// Handle graceful shutdown
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
