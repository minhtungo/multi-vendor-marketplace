import { appConfig } from '@/configs/app';
import { env } from '@/configs/env';
import rateLimiter from '@/middlewares/rate-limiter';
import { healthCheckRouter } from '@repo/shared-server/routes';
import { serviceRoutes } from '@/routes';
import { errorHandler } from '@repo/shared-server/middlewares';
import cors from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

const app: Express = express();

// Set the application to trust the reverse proxy
app.set('trust proxy', true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: (origin, callback) => {
      // Handle missing or empty APP_ORIGIN environment variable
      if (!env.APP_ORIGIN) {
        callback(new Error('APP_ORIGIN environment variable is not configured'));
        return;
      }

      const allowedOrigins = env.APP_ORIGIN.split(',').map((o) => o.trim().toLowerCase());

      // For development/testing tools (Postman, etc.) - be more restrictive in production
      if (!origin && env.NODE_ENV === 'development') {
        callback(null, true);
        return;
      }

      if (origin && allowedOrigins.includes(origin.toLowerCase())) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} is not allowed by CORS policy. Allowed origins: ${env.APP_ORIGIN}`));
      }
    },
    credentials: true,
  })
);
app.use(helmet());
app.use(rateLimiter);

// Routes
app.use(`/${appConfig.apiVersion}/health-check`, healthCheckRouter);
app.use(serviceRoutes);

// Error handlers
app.use(errorHandler());

export { app };
