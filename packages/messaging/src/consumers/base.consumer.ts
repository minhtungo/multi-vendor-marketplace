import { Channel, ConsumeMessage } from 'amqplib';
import { rabbitMQConnection } from '../config/connection';

export abstract class BaseConsumer {
  protected channel: Channel | null = null;
  protected exchange: string;
  protected exchangeType: string;
  protected queue: string;
  protected routingKey: string;

  constructor(exchange: string, exchangeType: string, queue: string, routingKey: string) {
    this.exchange = exchange;
    this.exchangeType = exchangeType;
    this.queue = queue;
    this.routingKey = routingKey;
  }

  async initialize(): Promise<void> {
    this.channel = await rabbitMQConnection.getChannel();

    await this.channel.assertExchange(this.exchange, this.exchangeType, {
      durable: true,
    });

    await this.channel.assertQueue(this.queue, {
      durable: true,
    });

    await this.channel.bindQueue(this.queue, this.exchange, this.routingKey);

    await this.channel.prefetch(1);
  }

  async start(): Promise<void> {
    if (!this.channel) {
      await this.initialize();
    }

    if (!this.channel) {
      throw new Error('Channel not initialized');
    }

    await this.channel.consume(this.queue, async (msg: ConsumeMessage | null) => {
      if (!msg) return;

      try {
        const content = JSON.parse(msg.content.toString());
        await this.handleMessage(content);
        this.channel?.ack(msg);
      } catch (error) {
        console.error('Error processing message:', error);
        // Reject the message and requeue it
        this.channel?.nack(msg, false, true);
      }
    });
  }

  protected abstract handleMessage(message: any): Promise<void>;

  async close(): Promise<void> {
    if (this.channel) {
      await this.channel.close();
      this.channel = null;
    }
  }
}
