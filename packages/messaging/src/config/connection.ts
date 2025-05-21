import amqp, { Channel } from 'amqplib';
import { rabbitMQConfig } from './rabbitmq.config';

class RabbitMQConnection {
  private static instance: RabbitMQConnection;
  private connection: amqp.ChannelModel | null = null;
  private channel: Channel | null = null;
  private isConnecting: boolean = false;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private reconnectAttempts: number = 0;
  private readonly MAX_RECONNECT_ATTEMPTS = 10;
  private readonly INITIAL_RECONNECT_DELAY = 1000; // 1 second

  private constructor() {}

  static getInstance(): RabbitMQConnection {
    if (!RabbitMQConnection.instance) {
      RabbitMQConnection.instance = new RabbitMQConnection();
    }
    return RabbitMQConnection.instance;
  }

  private calculateReconnectDelay(): number {
    // Exponential backoff with jitter
    const delay = Math.min(
      this.INITIAL_RECONNECT_DELAY * Math.pow(2, this.reconnectAttempts),
      rabbitMQConfig.reconnectTimeInSeconds * 1000
    );
    // Add jitter (±20%)
    const jitter = delay * 0.2;
    return delay + (Math.random() * jitter * 2 - jitter);
  }

  async connect(): Promise<void> {
    if (this.isConnecting) return;
    this.isConnecting = true;

    try {
      if (this.connection) {
        await this.connection.close();
      }

      this.connection = await amqp.connect(rabbitMQConfig.url);

      if (this.connection) {
        this.channel = await this.connection.createChannel();
        this.reconnectAttempts = 0; // Reset reconnect attempts on successful connection

        this.connection.on('error', (err) => {
          console.error('RabbitMQ connection error:', err);
          this.handleDisconnect();
        });

        this.connection.on('close', () => {
          console.log('RabbitMQ connection closed');
          this.handleDisconnect();
        });
      }

      console.log('Successfully connected to RabbitMQ');
    } catch (error) {
      console.error('Failed to connect to RabbitMQ:', error);
      this.handleDisconnect();
    } finally {
      this.isConnecting = false;
    }
  }

  private handleDisconnect(): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
    }

    if (this.reconnectAttempts >= this.MAX_RECONNECT_ATTEMPTS) {
      console.error('Max reconnection attempts reached. Please check your RabbitMQ server.');
      return;
    }

    this.reconnectAttempts++;
    const delay = this.calculateReconnectDelay();

    this.reconnectTimeout = setTimeout(() => {
      console.log(`Attempting to reconnect to RabbitMQ (attempt ${this.reconnectAttempts})...`);
      this.connect();
    }, delay);
  }

  private async validateChannel(channel: Channel): Promise<boolean> {
    try {
      const testQueue = `test-${Date.now()}`;
      await channel.assertQueue(testQueue, { autoDelete: true });
      await channel.deleteQueue(testQueue);
      return true;
    } catch (error) {
      console.error('Channel validation failed:', error);
      return false;
    }
  }

  async getChannel(): Promise<Channel> {
    if (!this.channel || !(await this.validateChannel(this.channel))) {
      await this.connect();
    }

    if (!this.channel) {
      throw new Error('Failed to create RabbitMQ channel');
    }

    return this.channel;
  }

  async close(): Promise<void> {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.channel) {
      try {
        await this.channel.close();
      } catch (error) {
        console.error('Error closing channel:', error);
      }
      this.channel = null;
    }

    if (this.connection) {
      try {
        await this.connection.close();
      } catch (error) {
        console.error('Error closing connection:', error);
      }
      this.connection = null;
    }

    this.reconnectAttempts = 0;
  }
}

export const rabbitMQConnection = RabbitMQConnection.getInstance();
