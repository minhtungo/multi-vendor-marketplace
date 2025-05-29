import { appConfig } from '@/configs/app';
import { env } from '@/configs/env';
import { createServiceProxy } from '../lib/proxy-factory';
import { optionalAccess } from '../middlewares/assert-access';
import { Router } from 'express';

const router = Router();

// Product service
router.use(
  `/${appConfig.apiVersion}/products`,
  ...optionalAccess,
  createServiceProxy(env.PRODUCT_SERVICE_URL, 'Product')
);

// Product categories
router.use(
  `/${appConfig.apiVersion}/product-categories`,
  ...optionalAccess,
  createServiceProxy(env.PRODUCT_SERVICE_URL, 'Product category')
);

export { router as productRoutes };
