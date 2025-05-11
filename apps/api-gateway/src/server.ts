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
app.use(cors({ origin: env.APP_ORIGIN, credentials: true }));
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(createRequestLogger(env));

// Routes
app.use('/health-check', healthCheckRouter);
app.use('/', (req, res) => {
  console.log('Request received');
  res.send('Hello World');
});

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app };
