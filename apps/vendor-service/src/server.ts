import cors from 'cors';
import express, { type Express } from 'express';

import { env } from '@/configs/env';
import { openAPIRouter } from '@/docs/openAPIRouter';
import '@/lib/strategies/jwt';
import '@/lib/strategies/vendor-jwt';
import { authUserRouter } from '@/routes/auth.user.route';
import { authVendorRouter } from '@/routes/vendor.route';
import { healthCheckRouter } from '@/routes/health-check.route';
import { errorHandler, createRequestLogger } from '@repo/server/middlewares';
import cookieParser from 'cookie-parser';
import passport from 'passport';

const app: Express = express();

// Set the application to trust the reverse proxy
// app.set('trust proxy', true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = Array.isArray(env.APP_ORIGIN) ? env.APP_ORIGIN : [env.APP_ORIGIN];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// Request logging only in production
env.isProduction && app.use(createRequestLogger(env));

// Routes
app.use('/api/health-check', healthCheckRouter);
app.use('/api/auth/vendor', authVendorRouter);
app.use('/api/auth/user', authUserRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app };
