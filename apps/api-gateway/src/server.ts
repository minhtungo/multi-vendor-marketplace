import cors from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';
import proxy from 'express-http-proxy';
import { env } from '@/configs/env';
import { openAPIRouter } from '@/docs/openAPIRouter';
import errorHandler from '@/middlewares/errorHandler';
import rateLimiter from '@/middlewares/rateLimiter';
import requestLogger from '@/middlewares/requestLogger';
import { healthCheckRouter } from '@/routes/health-check.route';

const app: Express = express();

// Set the application to trust the reverse proxy
app.set('trust proxy', true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(requestLogger);

// Routes
app.use('/health-check', healthCheckRouter);
app.use('/', proxy(env.AUTH_SERVICE_URL));

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app };
