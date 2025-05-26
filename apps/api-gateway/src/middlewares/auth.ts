import { extractAndVerifyToken } from '@/lib/token';
import { logger } from '@/utils/logger';
import { NextFunction, Request, RequestHandler, Response } from 'express';

const requireAuth = ((req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided', success: false });
  }

  const user = extractAndVerifyToken(authHeader);

  if (!user) {
    logger.warn('Access attempt without valid token!');
    return res.status(401).json({
      message: 'Authentication required',
      success: false,
    });
  }

  req.user = user;
  next();
}) as RequestHandler;

const optionalAuth = ((req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const user = extractAndVerifyToken(authHeader);

  if (user) {
    req.user = user;
  }

  next();
}) as RequestHandler;

const requireVendorRole = ((req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== 'vendor') {
    return res.status(403).json({
      message: 'Access denied. Only vendors can access this resource.',
      success: false,
    });
  }
  next();
}) as RequestHandler;

export { optionalAuth, requireVendorRole, requireAuth };
