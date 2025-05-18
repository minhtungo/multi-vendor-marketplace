import { appConfig } from '@/configs/app';
import { logger } from '@/utils/logger';
import type { Request, Response, NextFunction } from 'express';
import type { ProxyOptions } from 'express-http-proxy';

export const proxyOptions: ProxyOptions = {
  proxyReqPathResolver: (req: Request) => {
    console.log(req.originalUrl);
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
