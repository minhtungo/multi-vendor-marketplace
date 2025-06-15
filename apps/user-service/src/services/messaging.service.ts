import { USER_EVENTS, UserRegisteredEventPayload } from '@/events/user.events';
import { logger } from '@/utils/logger';
import { userService } from './user.service';
import { MessageBroker, MessageBrokerFactory, Message } from '@repo/messaging';

export class UserMessagingService {
  private messageBroker: MessageBroker | null = null;

  async connect(): Promise<void> {
    try {
      this.messageBroker = await MessageBrokerFactory.createBroker('user-service', logger);
      logger.info('User messaging service connected');
    } catch (error) {
      logger.error('Failed to connect user messaging service', error);
      throw error;
    }
  }

  async setupConsumers(): Promise<void> {
    if (!this.messageBroker) {
      throw new Error('Message broker not initialized. Call connect() first.');
    }

    try {
      await this.messageBroker.subscribe(this.handleUserRegistered.bind(this), {
        queue: 'user-service.user.registered',
        routingKey: USER_EVENTS.USER_REGISTERED.routingKey,
        exchange: 'user-events',
        durable: true,
        prefetch: 10,
        maxRetries: 3,
        deadLetterExchange: 'user-events-dlx',
        deadLetterRoutingKey: 'user.registered.failed',
      });

      logger.info('User event consumers setup completed');
    } catch (error) {
      logger.error('Failed to setup consumers', error);
      throw error;
    }
  }

  private async handleUserRegistered(message: Message<UserRegisteredEventPayload>): Promise<void> {
    try {
      logger.info('Processing user registered event', {
        messageId: message.id,
        email: message.data.email,
      });

      const result = await userService.createUser({
        email: message.data.email,
        name: message.data.name,
        password: message.data.password,
        role: message.data.role,
      });

      if (result.success) {
        logger.info('User created successfully from event', {
          messageId: message.id,
          userId: result.data?.id,
        });
      } else {
        throw new Error(`Failed to create user: ${result.message}`);
      }
    } catch (error) {
      logger.error('Error processing user registered event', error, {
        messageId: message.id,
        email: message.data.email,
      });
      throw error; // Re-throw to trigger retry mechanism
    }
  }

  async disconnect(): Promise<void> {
    if (this.messageBroker) {
      await this.messageBroker.disconnect();
      this.messageBroker = null;
      logger.info('User messaging service disconnected');
    }
  }
}

export const userMessagingService = new UserMessagingService();
