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
      const allowedOrigins = env.APP_ORIGIN.split(',');
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
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
