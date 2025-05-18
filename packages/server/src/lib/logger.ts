import { Logger, pino } from 'pino';

export type LoggerOptions = {
  name?: string;
  level?: string;
  isProduction?: boolean;
};

export const createLogger = (options: LoggerOptions = {}): Logger => {
  const { name = 'server', level = 'info', isProduction = false } = options;

  return pino({
    name,
    level,
    transport: isProduction ? undefined : { target: 'pino-pretty' },
  });
};
