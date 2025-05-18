import { env } from '@/configs/env';
import { logger } from '@/utils/logger';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { verify } from 'jsonwebtoken';

const validateToken = ((req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided', success: false });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    logger.warn('Access attempt without valid token!');
    return res.status(401).json({
      message: 'Authentication required',
      success: false,
    });
  }

  try {
    const decoded = verify(token, env.JWT_SECRET) as {
      sub: string;
      email: string;
      userId: string;
      role: 'user' | 'vendor';
    };

    req.user = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
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

export { requireVendorRole, validateToken };
