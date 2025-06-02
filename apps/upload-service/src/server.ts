import express, { RequestHandler, type Express } from 'express';

import { env } from '@/configs/env';
import { openAPIRouter } from '@/docs/openAPI-router';
import { uploadRouter } from '@/routes/upload.route';
import { createRequestLogger, errorHandler, requireUserContext } from '@repo/shared-server/middlewares';
import { healthCheckRouter } from '@repo/shared-server/routes';

const app: Express = express();

// Set the application to trust the reverse proxy
// app.set('trust proxy', true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging only in production
env.isProduction && app.use(createRequestLogger(env));

app.use(requireUserContext as RequestHandler);

// Routes
app.use('/api/uploads/health-check', healthCheckRouter);
app.use('/api/uploads', uploadRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app };
