import express, { RequestHandler, type Express } from 'express';

import { env } from '@/configs/env';
import { openAPIRouter } from '@/docs/openAPI-router';
import { createRequestLogger, errorHandler, optionalUserContext } from '@repo/server/middlewares';
import { cartRouter } from '@/routes/cart.route';
import { healthCheckRouter } from '@repo/server/routes';

const app: Express = express();

// Set the application to trust the reverse proxy
// app.set('trust proxy', true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging only in production
env.isProduction && app.use(createRequestLogger(env));

app.use(optionalUserContext as RequestHandler);

// Routes
app.use('/api/cart/health-check', healthCheckRouter);
app.use('/api/cart', cartRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app };
