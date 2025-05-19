import { handleServiceResponse, ServiceResponse } from '@repo/server/lib';
import express, { type Request, type Response, type Router } from 'express';

export const healthCheckRouter: Router = express.Router();

healthCheckRouter.get('/', (_req: Request, res: Response) => {
  const serviceResponse = ServiceResponse.success('Service is healthy', null);
  handleServiceResponse(serviceResponse, res);
});
