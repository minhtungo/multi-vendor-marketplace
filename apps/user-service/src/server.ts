import express, { type Express } from 'express';

import { env } from '@/configs/env';
import { openAPIRouter } from '@/docs/openAPIRouter';
import '@/lib/strategies/jwt';
import '@/lib/strategies/vendor-jwt';
import { userRouter } from '@/routes/user.route';
import { healthCheckRouter } from '@/routes/health-check.route';
import { createRequestLogger, errorHandler } from '@repo/server/middlewares';

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

export default app;
