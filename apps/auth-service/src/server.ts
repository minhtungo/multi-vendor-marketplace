import express, { type Express } from 'express';

import { env } from '@/configs/env';
import { openAPIRouter } from '@/docs/openAPI-router';
import { authUserRouter } from '@/routes/auth.user.route';
import { errorHandler, createRequestLogger } from '@repo/shared-server/middlewares';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import '@/lib/strategies/jwt';
import '@/lib/strategies/vendor-jwt';
import { authVendorRouter } from '@/routes/auth.vendor.route';
import { healthCheckRouter } from '@repo/shared-server/routes';

const app: Express = express();

// Set the application to trust the reverse proxy
// app.set('trust proxy', true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

// Request logging only in production
env.isProduction && app.use(createRequestLogger(env));

// Routes
app.use('/api/auth/health-check', healthCheckRouter);
app.use('/api/auth/user', authUserRouter);
app.use('/api/auth/vendor', authVendorRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app };
