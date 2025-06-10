import { MessagingConfig } from '../config';
import { MessageBroker } from '../message-broker';

import { Logger } from '../types';

export class MessageBrokerFactory {
  private static brokers = new Map<string, MessageBroker>();

  static async createBroker(serviceName: string, logger?: Logger, customConfig?: any): Promise<MessageBroker> {
    if (MessageBrokerFactory.brokers.has(serviceName)) {
      return MessageBrokerFactory.brokers.get(serviceName)!;
    }

    const config = customConfig || MessagingConfig.getServiceConfig(serviceName);
    const broker = new MessageBroker(config, logger);

    await broker.connect();
    MessageBrokerFactory.brokers.set(serviceName, broker);

    return broker;
  }

  static getBroker(serviceName: string): MessageBroker | undefined {
    return MessageBrokerFactory.brokers.get(serviceName);
  }

  static async disconnectAll(): Promise<void> {
    const disconnectPromises = Array.from(MessageBrokerFactory.brokers.values()).map((broker) => broker.disconnect());

    await Promise.all(disconnectPromises);
    MessageBrokerFactory.brokers.clear();
  }
}
