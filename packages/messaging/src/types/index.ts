export interface MessageBrokerConfig {
  url: string;
  exchange?: string;
  retryAttempts?: number;
  retryDelay?: number;
  prefetch?: number;
  connectionTimeout?: number;
  heartbeat?: number;
}

export interface PublishOptions {
  routingKey: string;
  exchange?: string;
  persistent?: boolean;
  expiration?: string;
  priority?: number;
  headers?: Record<string, any>;
}

export interface ConsumeOptions {
  queue: string;
  exchange?: string;
  routingKey?: string;
  autoAck?: boolean;
  prefetch?: number;
  durable?: boolean;
  exclusive?: boolean;
  autoDelete?: boolean;
  deadLetterExchange?: string;
  deadLetterRoutingKey?: string;
  messageTtl?: number;
  maxRetries?: number;
}

export interface Message<T = any> {
  id: string;
  timestamp: number;
  data: T;
  headers?: Record<string, any>;
  retryCount?: number;
}

export interface MessageHandler<T = any> {
  (message: Message<T>): Promise<void> | void;
}

export interface Logger {
  info(message: string, meta?: any): void;
  error(message: string, error?: Error, meta?: any): void;
  warn(message: string, meta?: any): void;
  debug(message: string, meta?: any): void;
}
