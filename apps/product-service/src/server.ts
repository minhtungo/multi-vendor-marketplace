import express, { RequestHandler, type Express } from 'express';

import { env } from '@/configs/env';
import { openAPIRouter } from '@/docs/openAPI-router';
import { productRouter } from '@/routes/product.route';
import { productCategoryRouter } from '@/routes/product-category.route';
import { createRequestLogger, errorHandler, optionalUserContext } from '@repo/server/middlewares';
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
app.use('/api/products/health-check', healthCheckRouter);
app.use('/api/products/categories', productCategoryRouter);
app.use('/api/products', productRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app };
