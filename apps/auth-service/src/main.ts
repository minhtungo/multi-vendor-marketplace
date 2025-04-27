import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { env } from './configs/env';
import { openAPIRouter } from './docs/openAPIRouter';
import { rateLimiter } from './middlewares/rate-limiter';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from '@packages/middlewares/error-handler';

const app = express();

app.use(
  cors({
    origin: env.APP_ORIGIN,
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Middlewares
app.use(morgan(env.NODE_ENV === 'development' ? 'dev' : 'combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Rate limiting
app.use(rateLimiter);

// Set the application to trust the reverse proxy
app.set('trust proxy', true);

app.get('/health', (req, res) => {
  res.send({ message: 'Welcome to auth service!' });
});

// Swagger UI
app.use(openAPIRouter);

// Error handling
app.use(errorMiddleware);

const port = env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
