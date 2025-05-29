import { appConfig } from '@/configs/app';
import { env } from '@/configs/env';
import { createServiceProxy } from '../lib/proxy-factory';
import { Router } from 'express';

const router = Router();

// User service
router.use(`/${appConfig.apiVersion}/users`, createServiceProxy(env.USER_SERVICE_URL, 'User'));

export { router as userRoutes };
