import { appConfig } from '@/configs/app';
import { env } from '@/configs/env';
import { createServiceProxy } from '../lib/proxy-factory';
import { authenticatedAccess } from '../middlewares/assert-access';
import { Router } from 'express';

const router = Router();

// Upload service (requires auth)
router.use(
  `/${appConfig.apiVersion}/uploads`,
  ...authenticatedAccess,
  createServiceProxy(env.UPLOAD_SERVICE_URL, 'Upload')
);

export { router as uploadRoutes };
