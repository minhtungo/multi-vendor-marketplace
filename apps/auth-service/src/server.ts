import cors from 'cors';
import express, { type Express } from 'express';

import { env } from '@/configs/env';
import { openAPIRouter } from '@/docs/openAPIRouter';
import '@/lib/strategies/jwt';
import { authRouter } from '@/routes/auth.route';
import { healthCheckRouter } from '@/routes/health-check.route';
import errorHandler from '@repo/server/middlewares/error-handler';
import { createRequestLogger } from '@repo/server/middlewares/request-logger';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { vendorRouter } from '@/routes/vendor.route';
import { stripeRouter } from '@/routes/stripe.route';

const app: Express = express();

// Set the application to trust the reverse proxy
// app.set('trust proxy', true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(cors({ origin: env.APP_ORIGIN, credentials: true }));
// app.use(helmet());
// app.use(rateLimiter);

// Request logging
// app.use(createRequestLogger(env));

// Routes
app.use('/api/health-check', healthCheckRouter);
app.use('/api/auth/vendor', vendorRouter);
app.use('/api/auth', authRouter);
app.use('/api/stripe', stripeRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app };
