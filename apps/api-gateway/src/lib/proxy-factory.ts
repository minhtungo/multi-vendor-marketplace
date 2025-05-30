import { proxyOptions, forwardUserContext } from '@/lib/proxy-options';
import { logger } from '@/utils/logger';
import proxy from 'express-http-proxy';

export const createServiceProxy = (serviceUrl: string, serviceName: string) => {
  return proxy(serviceUrl, {
    ...proxyOptions,
    proxyReqOptDecorator: forwardUserContext,
    userResDecorator: (proxyRes, proxyResData) => {
      logger.info(`Response received from ${serviceName} service: ${proxyRes.statusCode}`);
      return proxyResData;
    },
  });
};
