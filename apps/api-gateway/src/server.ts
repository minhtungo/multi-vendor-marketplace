import cors from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';
import proxy from 'express-http-proxy';
import { env } from '@/configs/env';
import { openAPIRouter } from '@/docs/openAPIRouter';
import rateLimiter from '@/middlewares/rate-limiter';
import { healthCheckRouter } from '@/routes/health-check.route';
import { createRequestLogger } from '@repo/server/middlewares/request-logger';
import errorHandler from '@repo/server/middlewares/error-handler';

const app: Express = express();

// Set the application to trust the reverse proxy
app.set('trust proxy', true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: (origin, callback) => {
      console.log('origin', origin);
      console.log('env.APP_ORIGIN', env.APP_ORIGIN);
      const allowedOrigins = Array.isArray(env.APP_ORIGIN) ? env.APP_ORIGIN : [env.APP_ORIGIN];
      console.log('allowedOrigins', allowedOrigins);
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

// Request logging
// app.use(createRequestLogger(env));

// Routes
app.use('/health-check', healthCheckRouter);
app.use(
  '/',
  (req, res, next) => {
    console.log('Request received');
    next();
  },
  proxy(env.AUTH_SERVICE_URL)
);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app };
