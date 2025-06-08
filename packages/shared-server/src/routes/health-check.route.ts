import { createApiResponse } from '@repo/shared-server/docs';
import { handleServiceResponse, ServiceResponse } from '@repo/shared-server/lib';

import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { type Request, type Response, type Router } from 'express';
import { z } from 'zod/v4';

export const healthCheckRegistry = new OpenAPIRegistry();
export const healthCheckRouter: Router = express.Router();

healthCheckRegistry.registerPath({
  method: 'get',
  path: '/health-check',
  tags: ['Health Check'],
  responses: createApiResponse(z.null(), 'Success'),
});

healthCheckRouter.get('/', (_req: Request, res: Response) => {
  const serviceResponse = ServiceResponse.success('Service is healthy', null);
  handleServiceResponse(serviceResponse, res);
});
