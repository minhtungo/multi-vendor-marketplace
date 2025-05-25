import express, { type Express } from 'express';

import { env } from '@/configs/env';
import { openAPIRouter } from '@/docs/openAPI-router';
import { userRouter } from '@/routes/user.route';
import { healthCheckRouter } from '@/routes/health-check.route';
import { createRequestLogger, errorHandler } from '@repo/server/middlewares';
import { userAuthConsumer } from '@/lib/auth.consumer';
import { logger } from '@/utils/logger';

const app: Express = express();

// Set the application to trust the reverse proxy
// app.set('trust proxy', true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging only in production
env.isProduction && app.use(createRequestLogger(env));

// Routes
app.use('/api/health-check', healthCheckRouter);
app.use('/api/users', userRouter);

// Swagger UI
app.use('/api-docs', openAPIRouter);

// Error handlers
app.use(errorHandler());

// Initialize message consumer
const initializeConsumer = async () => {
  try {
    await userAuthConsumer.initialize();
    logger.info('Auth consumer initialized successfully');
    await userAuthConsumer.start();
    logger.info('Auth consumer started successfully');
  } catch (error: unknown) {
    logger.error('Failed to initialize auth consumer:', error instanceof Error ? error.message : String(error));
  }
};

initializeConsumer();

export { app };
