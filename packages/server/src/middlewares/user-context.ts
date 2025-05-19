import { handleServiceResponse } from '../lib/http-handlers';
import { ServiceResponse } from '../lib/service-response';
import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const extractUserContext = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers['x-user-id']) {
    req.user = {
      id: req.headers['x-user-id'] as string,
      email: req.headers['x-user-email'] as string,
      role: req.headers['x-user-role'] as 'user' | 'vendor',
    };
  } else {
    const serviceResponse = ServiceResponse.failure('Unauthorized', null, StatusCodes.UNAUTHORIZED);
    return handleServiceResponse(serviceResponse, res);
  }

  next();
};
