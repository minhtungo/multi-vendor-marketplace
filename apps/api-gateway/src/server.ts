import { appConfig } from '@/configs/app';
import { env } from '@/configs/env';
import { proxyOptions, forwardUserContext } from '@/lib/proxy-options';
import { validateToken, requireVendorRole } from '@/middlewares/auth';
import rateLimiter from '@/middlewares/rate-limiter';
import { healthCheckRouter } from '@/routes/health-check.route';
import { logger } from '@/utils/logger';
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

// Routes
app.use(`/${appConfig.apiVersion}/health-check`, healthCheckRouter);

app.use(
  `/${appConfig.apiVersion}/auth`,
  proxy(env.AUTH_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      // Forward the authorization header
      if (srcReq.headers.authorization) {
        proxyReqOpts.headers = proxyReqOpts.headers || {};
      }

      return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData) => {
      logger.info(`Response received from Auth service: ${proxyRes.statusCode}`);
      return proxyResData;
    },
  })
);

app.use(
  `/${appConfig.apiVersion}/product`,
  validateToken,
  requireVendorRole,
  proxy(env.PRODUCT_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: forwardUserContext,
    userResDecorator: (proxyRes, proxyResData) => {
      logger.info(`Response received from Product service: ${proxyRes.statusCode}`);
      return proxyResData;
    },
  })
);

// Error handlers
app.use(errorHandler());

export { app };
