import express, { RequestHandler, type Express } from 'express';

import { env } from '@/configs/env';
import { openAPIRouter } from '@/docs/openAPIRouter';
import { productRouter } from '@/routes/product.route';
import { productCategoryRouter } from '@/routes/product-category.route';
import { extractUserContext, createRequestLogger, errorHandler } from '@repo/server/middlewares';

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
app.use('/api/products/categories', productCategoryRouter);
app.use('/api/products', productRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app };
