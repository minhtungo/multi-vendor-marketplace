import { ConnectionManager } from '../connection';
import { PublishError } from '../errors';
import { Message, PublishOptions, Logger } from '../types';
import { v4 as uuidv4 } from 'uuid';

export class MessagePublisher {
  constructor(
    private connectionManager: ConnectionManager,
    private logger?: Logger
  ) {}

  async publish<T>(data: T, options: PublishOptions): Promise<void> {
    if (!this.connectionManager.isConnected()) {
      throw new PublishError('Not connected to message broker');
    }

    const message: Message<T> = {
      id: uuidv4(),
      timestamp: Date.now(),
      data,
      headers: options.headers,
    };

    const messageBuffer = Buffer.from(JSON.stringify(message));
    const channel = this.connectionManager.getChannel();

    try {
      const exchange = options.exchange || 'default';

      const success = channel.publish(exchange, options.routingKey, messageBuffer, {
        persistent: options.persistent ?? true,
        expiration: options.expiration,
        priority: options.priority,
        headers: options.headers,
        messageId: message.id,
        timestamp: message.timestamp,
      });

      if (!success) {
        throw new PublishError('Failed to publish message - channel buffer full');
      }

      this.logger?.info('Message published', {
        messageId: message.id,
        routingKey: options.routingKey,
        exchange,
      });
    } catch (error) {
      this.logger?.error('Failed to publish message', error as Error, {
        messageId: message.id,
        routingKey: options.routingKey,
      });
      throw new PublishError(`Failed to publish message: ${(error as Error).message}`);
    }
  }

  async publishBatch<T>(messages: Array<{ data: T; options: PublishOptions }>, batchSize: number = 100): Promise<void> {
    for (let i = 0; i < messages.length; i += batchSize) {
      const batch = messages.slice(i, i + batchSize);

      await Promise.all(batch.map(({ data, options }) => this.publish(data, options)));
    }
  }
}
