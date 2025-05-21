import { Channel } from 'amqplib';
import { rabbitMQConnection } from '../config/connection';

export abstract class BaseProducer {
  protected channel: Channel | null = null;
  protected exchange: string;
  protected exchangeType: string;
  protected routingKey: string;

  constructor(exchange: string, exchangeType: string, routingKey: string) {
    this.exchange = exchange;
    this.exchangeType = exchangeType;
    this.routingKey = routingKey;
  }

  async initialize(): Promise<void> {
    this.channel = await rabbitMQConnection.getChannel();
    await this.channel.assertExchange(this.exchange, this.exchangeType, {
      durable: true,
    });
  }

  protected async publish(message: any): Promise<boolean> {
    if (!this.channel) {
      await this.initialize();
    }

    if (!this.channel) {
      throw new Error('Channel not initialized');
    }

    return this.channel.publish(this.exchange, this.routingKey, Buffer.from(JSON.stringify(message)), {
      persistent: true,
      contentType: 'application/json',
    });
  }

  async close(): Promise<void> {
    if (this.channel) {
      await this.channel.close();
      this.channel = null;
    }
  }
}
