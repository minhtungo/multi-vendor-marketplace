import { env } from '@/configs/env';
import { openAPIRouter } from '@/docs/openAPIRouter';
import rateLimiter from '@/middlewares/rate-limiter';
import { healthCheckRouter } from '@/routes/health-check.route';
import errorHandler from '@repo/server/middlewares/error-handler';
import cors from 'cors';
import express, { type Express } from 'express';
import proxy from 'express-http-proxy';
import helmet from 'helmet';

const app: Express = express();

// Set the application to trust the reverse proxy
app.set('trust proxy', true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.use(helmet());
app.use(rateLimiter);

// Request logging
// app.use(createRequestLogger(env));

// Routes
app.use('/health-check', healthCheckRouter);
app.use('/', proxy(env.AUTH_SERVICE_URL));

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app };
