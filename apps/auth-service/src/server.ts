import cors from 'cors';
import express, { type Express } from 'express';
import { env } from './configs/env';
import { openAPIRouter } from './docs/openAPIRouter';
import { rateLimiter } from './middlewares/rate-limiter';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from '@packages/middlewares/error-handler';
import { requestLogger } from '@packages/middlewares/error-logger';
import { authRouter } from './routes/auth.routes';

const app: Express = express();

app.use(
  cors({
    origin: env.APP_ORIGIN,
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Set the application to trust the reverse proxy
app.set('trust proxy', true);

// Middlewares
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(rateLimiter);

//Request Logging
app.use(requestLogger);

//Routes
app.get('/health', (req, res) => {
  res.send({ message: 'Welcome to auth service!' });
});
app.use('/api/auth', authRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handling
app.use(errorMiddleware);

export { app };
