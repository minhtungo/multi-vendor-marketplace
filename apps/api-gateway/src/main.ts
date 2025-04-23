import express from 'express';
import * as path from 'path';
import cors from 'cors';
import { env } from './config/env';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { rateLimiter } from './middlewares/rate-limiter';
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

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to api-gateway!' });
});

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
