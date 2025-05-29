import { appConfig } from '@/configs/app';
import { env } from '@/configs/env';
import { createSimpleProxy } from '../lib/proxy-factory';
import { Router } from 'express';

const router = Router();

router.use(`/${appConfig.apiVersion}/cart`, createSimpleProxy(env.CART_SERVICE_URL));

export { router as cartRoutes };
