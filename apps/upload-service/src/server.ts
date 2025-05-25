import express, { RequestHandler, type Express } from 'express';

import { env } from '@/configs/env';
import { openAPIRouter } from '@/docs/openAPI-router';
import { createRequestLogger, errorHandler, extractUserContext } from '@repo/server/middlewares';
import { uploadRouter } from '@/routes/upload.route';

const app: Express = express();

// Set the application to trust the reverse proxy
// app.set('trust proxy', true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging only in production
env.isProduction && app.use(createRequestLogger(env));

app.use(extractUserContext as RequestHandler);

// Routes
app.use('/api/upload', uploadRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app };
