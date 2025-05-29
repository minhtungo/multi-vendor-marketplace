import { appConfig } from '@/configs/app';
import { env } from '@/configs/env';
import { createServiceProxy } from '../lib/proxy-factory';
import { Router } from 'express';

const router = Router();

// Auth service
router.use(`/${appConfig.apiVersion}/auth`, createServiceProxy(env.AUTH_SERVICE_URL, 'Auth'));

export { router as authRoutes };
