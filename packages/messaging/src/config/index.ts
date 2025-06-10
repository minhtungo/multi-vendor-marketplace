export class MessagingConfig {
  private static instance: MessagingConfig;

  private constructor(
    public readonly url: string,
    public readonly defaultExchange: string,
    public readonly retryAttempts: number = 3,
    public readonly retryDelay: number = 1000,
    public readonly prefetch: number = 10
  ) {}

  static initialize(config: {
    url?: string;
    defaultExchange?: string;
    retryAttempts?: number;
    retryDelay?: number;
    prefetch?: number;
  }) {
    if (MessagingConfig.instance) {
      throw new Error('MessagingConfig already initialized');
    }

    MessagingConfig.instance = new MessagingConfig(
      config.url || process.env.RABBITMQ_URL || 'amqp://localhost:5672',
      config.defaultExchange || process.env.RABBITMQ_EXCHANGE || 'default',
      config.retryAttempts,
      config.retryDelay,
      config.prefetch
    );
  }

  static getInstance(): MessagingConfig {
    if (!MessagingConfig.instance) {
      // Auto-initialize with defaults if not explicitly initialized
      MessagingConfig.initialize({});
    }
    return MessagingConfig.instance;
  }

  static getServiceConfig(serviceName: string) {
    const config = MessagingConfig.getInstance();
    return {
      url: config.url,
      exchange: `${config.defaultExchange}.${serviceName}`,
      retryAttempts: config.retryAttempts,
      retryDelay: config.retryDelay,
      prefetch: config.prefetch,
    };
  }
}
