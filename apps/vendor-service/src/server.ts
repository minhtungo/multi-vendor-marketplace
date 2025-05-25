import express, { type Express } from 'express';
import { env } from '@/configs/env';
import { openAPIRouter } from '@/docs/openAPI-router';
import { healthCheckRouter } from '@/routes/health-check.route';
import { vendorRouter } from '@/routes/vendor.route';
import { createRequestLogger, errorHandler } from '@repo/server/middlewares';
import { vendorAuthConsumer } from '@/lib/auth.consumer';
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
app.use('/api/vendors', vendorRouter);

// Swagger UI
app.use('/api-docs', openAPIRouter);

// Error handlers
app.use(errorHandler());

// Initialize message consumer
const initializeConsumer = async () => {
  try {
    await vendorAuthConsumer.initialize();
    logger.info('Vendor auth consumer initialized successfully');
    await vendorAuthConsumer.start();
    logger.info('Vendor auth consumer started successfully');
  } catch (error: unknown) {
    logger.error('Failed to initialize vendor auth consumer:', error instanceof Error ? error.message : String(error));
  }
};

initializeConsumer();

export { app };
