import express, { type Express } from 'express';

import { env } from '@/configs/env';
import { openAPIRouter } from '@/docs/openAPI-router';
import { userRouter } from '@/routes/user.route';
import { createRequestLogger, errorHandler } from '@repo/shared-server/middlewares';
import { logger } from '@/utils/logger';
import { healthCheckRouter } from '@repo/shared-server/routes';

const app: Express = express();

// Set the application to trust the reverse proxy
// app.set('trust proxy', true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging only in production
env.isProduction && app.use(createRequestLogger(env));

// Routes
app.use('/api/users/health-check', healthCheckRouter);
app.use('/api/users', userRouter);

// Swagger UI
app.use('/api-docs', openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app };
