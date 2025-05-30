import { appConfig } from '@/configs/app';
import { env } from '@/configs/env';
import { createServiceProxy } from '../lib/proxy-factory';
import { Router } from 'express';

const router = Router();

router.use(`/${appConfig.apiVersion}/cart`, createServiceProxy(env.CART_SERVICE_URL, 'Cart'));

export { router as cartRoutes };
