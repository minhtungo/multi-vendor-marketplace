import express, { type Express } from 'express';
import { env } from '@/configs/env';
import { openAPIRouter } from '@/docs/openAPIRouter';
import { healthCheckRouter } from '@/routes/health-check.route';
import { vendorRouter } from '@/routes/vendor.route';
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
app.use('/api/vendors', vendorRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app };
