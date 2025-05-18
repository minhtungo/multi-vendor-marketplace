import { appConfig } from '@/configs/app';
import { env } from '@/configs/env';
import { logger } from '@/utils/logger';
import { NextFunction, Request, Response, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const validateToken = ((req: Request, res: Response, next: NextFunction) => {
  if (
    req.path.startsWith(`/${appConfig.apiVersion}/api/auth`) ||
    req.path === `/${appConfig.apiVersion}/health-check`
  ) {
    return next();
  }

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
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}) as RequestHandler;

export default validateToken;
