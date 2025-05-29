import { appConfig } from '@/configs/app';
import { env } from '@/configs/env';
import { createServiceProxy } from '../lib/proxy-factory';
import { vendorAccess } from '../middlewares/assert-access';
import { Router } from 'express';

const router = Router();

// Payment service (requires auth and vendor role)
router.use(`/${appConfig.apiVersion}/payment`, ...vendorAccess, createServiceProxy(env.PAYMENT_SERVICE_URL, 'Payment'));

export { router as paymentRoutes };
