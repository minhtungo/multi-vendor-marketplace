import express, { RequestHandler, type Express } from 'express';

import { env } from '@/configs/env';
import { openAPIRouter } from '@/docs/openAPI-router';
import { createRequestLogger, errorHandler, extractUserContext } from '@repo/server/middlewares';
import { orderRouter } from '@/routes/order.route';
import { discountCodeRouter } from '@/routes/discount-code.route';
import { healthCheckRouter } from '@repo/server/routes';

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
app.use('/api/orders/health-check', healthCheckRouter);
app.use('/api/orders', orderRouter);
app.use('/api/orders/discount-codes', discountCodeRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app };
