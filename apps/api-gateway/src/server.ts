import { appConfig } from '@/configs/app';
import { env } from '@/configs/env';
import { proxyOptions, forwardUserContext } from '@/lib/proxy-options';
import { validateToken, requireVendorRole } from '@/middlewares/auth';
import rateLimiter from '@/middlewares/rate-limiter';
import { healthCheckRouter } from '@repo/server/routes';
import { logger } from '@/utils/logger';
import { errorHandler } from '@repo/server/middlewares';
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

// Routes
app.use(`/${appConfig.apiVersion}/health-check`, healthCheckRouter);

// Auth service
app.use(
  `/${appConfig.apiVersion}/auth`,
  proxy(env.AUTH_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: forwardUserContext,
    userResDecorator: (proxyRes, proxyResData) => {
      logger.info(`Response received from Auth service: ${proxyRes.statusCode}`);
      return proxyResData;
    },
  })
);

// User service
app.use(
  `/${appConfig.apiVersion}/users`,
  proxy(env.USER_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: forwardUserContext,
    userResDecorator: (proxyRes, proxyResData) => {
      logger.info(`Response received from User service: ${proxyRes.statusCode}`);
      return proxyResData;
    },
  })
);

// Product service
app.use(
  `/${appConfig.apiVersion}/products`,
  validateToken,
  proxy(env.PRODUCT_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: forwardUserContext,
    userResDecorator: (proxyRes, proxyResData) => {
      logger.info(`Response received from Product service: ${proxyRes.statusCode}`);
      return proxyResData;
    },
  })
);

// Product service
app.use(
  `/${appConfig.apiVersion}/product-categories`,
  validateToken,
  proxy(env.PRODUCT_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: forwardUserContext,
    userResDecorator: (proxyRes, proxyResData) => {
      logger.info(`Response received from Product category service: ${proxyRes.statusCode}`);
      return proxyResData;
    },
  })
);

// Payment service
app.use(
  `/${appConfig.apiVersion}/payment`,
  validateToken,
  requireVendorRole,
  proxy(env.PAYMENT_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: forwardUserContext,
    userResDecorator: (proxyRes, proxyResData) => {
      logger.info(`Response received from Payment service: ${proxyRes.statusCode}`);
      return proxyResData;
    },
  })
);

// Order service
app.use(
  `/${appConfig.apiVersion}/orders`,
  proxy(env.ORDER_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: forwardUserContext,
    userResDecorator: (proxyRes, proxyResData) => {
      logger.info(`Response received from Order service: ${proxyRes.statusCode}`);
      return proxyResData;
    },
  })
);

// Upload service
app.use(
  `/${appConfig.apiVersion}/uploads`,
  validateToken,
  proxy(env.UPLOAD_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: forwardUserContext,
    userResDecorator: (proxyRes, proxyResData) => {
      logger.info(`Response received from Upload service: ${proxyRes.statusCode}`);
      return proxyResData;
    },
  })
);

// Error handlers
app.use(errorHandler());

export { app };
