import { appConfig } from '@/configs/app';
import { logger } from '@/utils/logger';
import type { Request, Response, NextFunction } from 'express';
import type { ProxyOptions } from 'express-http-proxy';

type ProxyReqOptDecorator = (proxyReqOpts: any, srcReq: Request) => any;

export const forwardUserContext: ProxyReqOptDecorator = (proxyReqOpts, srcReq) => {
  proxyReqOpts.headers = proxyReqOpts.headers || {};

  if (srcReq.headers.authorization) {
    proxyReqOpts.headers.authorization = srcReq.headers.authorization;
  }

  if (srcReq.user) {
    const headers = proxyReqOpts.headers as Record<string, string>;
    headers['x-user-id'] = srcReq.user.id;
    headers['x-user-email'] = srcReq.user.email;
    headers['x-user-role'] = srcReq.user.role;
  }

  return proxyReqOpts;
};

export const proxyOptions: ProxyOptions = {
  proxyReqPathResolver: (req: Request) => {
    logger.info(`Proxying request to: ${req.originalUrl}`);
    return req.originalUrl.replace(new RegExp(`^/${appConfig.apiVersion}`), '/api');
  },
  proxyErrorHandler: (err: Error, res: Response, next: NextFunction) => {
    logger.error(`Proxy error: ${err.message}`);
    res.status(500).json({
      message: `Internal server error`,
      error: err.message,
    });
  },
};
