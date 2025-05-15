import cors from 'cors';
import express, { type Express } from 'express';

import { env } from '@/configs/env';
import { openAPIRouter } from '@/docs/openAPIRouter';
import '@/lib/strategies/jwt';
import '@/lib/strategies/vendor-jwt';
import { authRouter } from '@/routes/auth.route';
import { healthCheckRouter } from '@/routes/health-check.route';
import errorHandler from '@repo/server/middlewares/error-handler';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { vendorRouter } from '@/routes/vendor.route';
import { stripeRouter } from '@/routes/stripe.route';

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
// app.use(helmet());
// app.use(rateLimiter);

// Request logging
// app.use(createRequestLogger(env));

// Routes
app.use('/api/health-check', healthCheckRouter);
app.use('/api/auth/vendor/stripe', stripeRouter);
app.use('/api/auth/vendor', vendorRouter);
app.use('/api/auth', authRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app };
