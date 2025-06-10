import { ConnectionManager } from './connection';
import { MessageConsumer } from './consumer';
import { MessagePublisher } from './publisher';
import { MessageBrokerConfig, PublishOptions, ConsumeOptions, MessageHandler, Logger } from './types';

export class MessageBroker {
  private connectionManager: ConnectionManager;
  private publisher: MessagePublisher;
  private consumer: MessageConsumer;

  constructor(config: MessageBrokerConfig, logger?: Logger) {
    this.connectionManager = new ConnectionManager(config, logger);
    this.publisher = new MessagePublisher(this.connectionManager, logger);
    this.consumer = new MessageConsumer(this.connectionManager, logger);
  }

  async connect(): Promise<void> {
    await this.connectionManager.connect();
  }

  async disconnect(): Promise<void> {
    await this.consumer.stopAllConsumers();
    await this.connectionManager.close();
  }

  // Publisher methods
  async publish<T>(data: T, options: PublishOptions): Promise<void> {
    return this.publisher.publish(data, options);
  }

  async publishBatch<T>(messages: Array<{ data: T; options: PublishOptions }>, batchSize?: number): Promise<void> {
    return this.publisher.publishBatch(messages, batchSize);
  }

  // Consumer methods
  async subscribe<T>(handler: MessageHandler<T>, options: ConsumeOptions): Promise<string> {
    return this.consumer.consume(handler, options);
  }

  async unsubscribe(consumerTag: string): Promise<void> {
    return this.consumer.stopConsumer(consumerTag);
  }

  // Health check
  isConnected(): boolean {
    return this.connectionManager.isConnected();
  }

  // Event handling
  on(event: string, listener: (...args: any[]) => void): this {
    this.connectionManager.on(event, listener);
    return this;
  }

  off(event: string, listener: (...args: any[]) => void): this {
    this.connectionManager.off(event, listener);
    return this;
  }
}
