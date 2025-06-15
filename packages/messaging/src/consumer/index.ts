import { ConnectionManager } from '../connection';
import { ConsumeError } from '../errors';
import { Message, MessageHandler, ConsumeOptions, Logger } from '../types';

export class MessageConsumer {
  private consumers = new Map<string, { tag: string; handler: MessageHandler }>();

  constructor(
    private connectionManager: ConnectionManager,
    private logger?: Logger
  ) {}

  async consume<T>(handler: MessageHandler<T>, options: ConsumeOptions): Promise<string> {
    if (!this.connectionManager.isConnected()) {
      throw new ConsumeError('Not connected to message broker');
    }

    const channel = this.connectionManager.getChannel();
    const exchange = options.exchange || 'default';

    try {
      if (exchange !== 'default') {
        await channel.assertExchange(exchange, 'topic', {
          durable: true,
        });
      }

      if (options.deadLetterExchange && options.deadLetterExchange !== 'default') {
        await channel.assertExchange(options.deadLetterExchange, 'topic', {
          durable: true,
        });
      }

      // Assert queue
      const queueResult = await channel.assertQueue(options.queue, {
        durable: options.durable ?? true,
        exclusive: options.exclusive ?? false,
        autoDelete: options.autoDelete ?? false,
        arguments: {
          ...(options.deadLetterExchange && {
            'x-dead-letter-exchange': options.deadLetterExchange,
            'x-dead-letter-routing-key': options.deadLetterRoutingKey,
          }),
          ...(options.messageTtl && {
            'x-message-ttl': options.messageTtl,
          }),
        },
      });

      // Bind queue to exchange if routing key provided
      if (options.routingKey) {
        await channel.bindQueue(queueResult.queue, exchange, options.routingKey);
      }

      // Set prefetch if specified
      if (options.prefetch) {
        await channel.prefetch(options.prefetch);
      }

      // Start consuming
      const consumerResult = await channel.consume(
        queueResult.queue,
        async (msg) => {
          if (!msg) return;

          try {
            const message: Message<T> = JSON.parse(msg.content.toString());
            message.retryCount = (msg.properties.headers?.['x-retry-count'] as number) || 0;

            await handler(message);

            if (!options.autoAck) {
              channel.ack(msg);
            }

            this.logger?.debug('Message processed successfully', {
              messageId: message.id,
              queue: options.queue,
            });
          } catch (error) {
            this.logger?.error('Error processing message', error as Error, {
              queue: options.queue,
            });

            await this.handleProcessingError(msg, error as Error, options);
          }
        },
        {
          noAck: options.autoAck ?? false,
        }
      );

      const consumerTag = consumerResult.consumerTag;
      this.consumers.set(consumerTag, { tag: consumerTag, handler });

      this.logger?.info('Consumer started', {
        consumerTag,
        queue: options.queue,
        exchange,
      });

      return consumerTag;
    } catch (error) {
      this.logger?.error('Failed to start consumer', error as Error, {
        queue: options.queue,
      });
      throw new ConsumeError(`Failed to start consumer: ${(error as Error).message}`);
    }
  }

  private async handleProcessingError(msg: any, error: Error, options: ConsumeOptions): Promise<void> {
    const channel = this.connectionManager.getChannel();
    const retryCount = (msg.properties.headers?.['x-retry-count'] as number) || 0;
    const maxRetries = options.maxRetries || 3;

    if (retryCount < maxRetries) {
      // Retry the message
      const headers = {
        ...msg.properties.headers,
        'x-retry-count': retryCount + 1,
        'x-original-routing-key': msg.fields.routingKey,
      };

      channel.publish(msg.fields.exchange, msg.fields.routingKey, msg.content, { ...msg.properties, headers });

      channel.ack(msg);

      this.logger?.warn('Message requeued for retry', {
        retryCount: retryCount + 1,
        maxRetries,
      });
    } else {
      // Send to dead letter queue or reject
      if (options.deadLetterExchange) {
        channel.nack(msg, false, false);
        this.logger?.error('Message sent to dead letter queue', error);
      } else {
        channel.reject(msg, false);
        this.logger?.error('Message rejected after max retries', error);
      }
    }
  }

  async stopConsumer(consumerTag: string): Promise<void> {
    if (!this.consumers.has(consumerTag)) {
      throw new ConsumeError(`Consumer ${consumerTag} not found`);
    }

    const channel = this.connectionManager.getChannel();
    await channel.cancel(consumerTag);
    this.consumers.delete(consumerTag);

    this.logger?.info('Consumer stopped', { consumerTag });
  }

  async stopAllConsumers(): Promise<void> {
    const promises = Array.from(this.consumers.keys()).map((tag) => this.stopConsumer(tag));
    await Promise.all(promises);
  }
}
