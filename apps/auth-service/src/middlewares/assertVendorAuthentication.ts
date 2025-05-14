import { logger } from '@/utils/logger';
import { handleServiceResponse } from '@repo/server/lib/http-handlers';
import { ServiceResponse } from '@repo/server/lib/service-response';
import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import passport from 'passport';

const assertVendorAuthentication = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('vendor-jwt', { session: false }, async (err: any, user: Express.User | false, info: any) => {
    if (err) {
      logger.error('Error verifying access token', err);
      return next(err);
    }

    if (!user) {
      const serviceResponse = ServiceResponse.failure('Unauthorized', null, StatusCodes.UNAUTHORIZED);
      return handleServiceResponse(serviceResponse, res);
    }

    req.user = user;
    next();
  })(req, res, next);
};

export default assertVendorAuthentication;
