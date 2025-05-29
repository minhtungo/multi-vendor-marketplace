import { appConfig } from '@/configs/app';
import { env } from '@/configs/env';
import { createServiceProxy } from '../lib/proxy-factory';
import { authenticatedAccess } from '../middlewares/assert-access';
import { Router } from 'express';

const router = Router();

// Order service (requires auth)
router.use(
  `/${appConfig.apiVersion}/orders`,
  ...authenticatedAccess,
  createServiceProxy(env.ORDER_SERVICE_URL, 'Order')
);

export { router as orderRoutes };
