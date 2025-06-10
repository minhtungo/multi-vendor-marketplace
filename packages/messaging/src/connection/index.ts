import * as amqp from 'amqplib';
import { EventEmitter } from 'events';
import { ConnectionError } from '../errors';
import { MessageBrokerConfig, Logger } from '../types';
import { RetryManager } from '../utils/retry';

export class ConnectionManager extends EventEmitter {
  private connection: amqp.ChannelModel | null = null;
  private channel: amqp.Channel | null = null;
  private config: Required<MessageBrokerConfig>;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private isConnecting = false;

  constructor(
    config: MessageBrokerConfig,
    private logger?: Logger
  ) {
    super();
    this.config = {
      exchange: 'default',
      retryAttempts: 3,
      retryDelay: 1000,
      prefetch: 10,
      connectionTimeout: 30000,
      heartbeat: 60,
      ...config,
    };
  }

  async connect(): Promise<void> {
    if (this.isConnecting) return;

    this.isConnecting = true;

    try {
      await RetryManager.executeWithRetry(
        async () => {
          this.connection = await amqp.connect(this.config.url, {
            timeout: this.config.connectionTimeout,
            heartbeat: this.config.heartbeat,
          });

          this.channel = await this.connection.createChannel();
          await this.channel.prefetch(this.config.prefetch);

          // Declare default exchange
          await this.channel.assertExchange(this.config.exchange, 'topic', {
            durable: true,
          });

          this.setupConnectionEvents();
          this.logger?.info('RabbitMQ connection established');
          this.emit('connected');
        },
        this.config.retryAttempts,
        this.config.retryDelay
      );
    } catch (error) {
      this.logger?.error('Failed to connect to RabbitMQ', error as Error);
      throw new ConnectionError(`Failed to connect: ${(error as Error).message}`);
    } finally {
      this.isConnecting = false;
    }
  }

  private setupConnectionEvents(): void {
    if (!this.connection || !this.channel) return;

    this.connection.on('error', (error) => {
      this.logger?.error('RabbitMQ connection error', error);
      this.emit('error', error);
      this.scheduleReconnect();
    });

    this.connection.on('close', () => {
      this.logger?.warn('RabbitMQ connection closed');
      this.emit('disconnected');
      this.scheduleReconnect();
    });

    this.channel.on('error', (error) => {
      this.logger?.error('RabbitMQ channel error', error);
      this.emit('error', error);
    });

    this.channel.on('close', () => {
      this.logger?.warn('RabbitMQ channel closed');
    });
  }

  private scheduleReconnect(): void {
    if (this.reconnectTimer) return;

    this.reconnectTimer = setTimeout(async () => {
      this.reconnectTimer = null;
      this.connection = null;
      this.channel = null;

      try {
        await this.connect();
      } catch (error) {
        this.logger?.error('Reconnection failed', error as Error);
        this.scheduleReconnect();
      }
    }, this.config.retryDelay);
  }

  getChannel(): amqp.Channel {
    if (!this.channel) {
      throw new ConnectionError('No active channel available');
    }
    return this.channel;
  }

  isConnected(): boolean {
    return this.connection !== null && this.channel !== null;
  }

  async close(): Promise<void> {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    if (this.channel) {
      await this.channel.close();
      this.channel = null;
    }

    if (this.connection) {
      await this.connection.close();
      this.connection = null;
    }

    this.logger?.info('RabbitMQ connection closed');
    this.emit('closed');
  }
}
