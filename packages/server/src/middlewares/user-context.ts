import { handleServiceResponse } from '../lib/http-handlers';
import { ServiceResponse } from '../lib/service-response';
import type { NextFunction, Request, Response } from 'express';
import { HTTP_STATUS_CODES } from '@repo/server/core';

interface UserContextOptions {
  requireAuth?: boolean;
}

const extractUserContext = (options: UserContextOptions = { requireAuth: true }) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.headers['x-user-id']) {
      req.user = {
        id: req.headers['x-user-id'] as string,
        email: req.headers['x-user-email'] as string,
        role: req.headers['x-user-role'] as 'user' | 'vendor',
      };
    } else if (options.requireAuth) {
      const serviceResponse = ServiceResponse.failure('Unauthorized', null, HTTP_STATUS_CODES.UNAUTHORIZED);
      return handleServiceResponse(serviceResponse, res);
    }

    next();
  };
};

export const requireUserContext = extractUserContext({ requireAuth: true });
export const optionalUserContext = extractUserContext({ requireAuth: false });
