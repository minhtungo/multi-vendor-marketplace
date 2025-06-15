import { USER_EVENTS, UserForgotPasswordEventPayload, UserRegisteredEventPayload } from '@/events/user.events';
import { logger } from '@/utils/logger';
import { MessageBroker, MessageBrokerFactory } from '@repo/messaging';

const SERVICE_NAME = 'user-service';
const MESSAGE_VERSION = '1.0';

export class UserMessagingService {
  private messageBroker: MessageBroker | null = null;

  async connect(): Promise<void> {
    try {
      this.messageBroker = await MessageBrokerFactory.createBroker(SERVICE_NAME, logger);
      logger.info('User messaging service connected');
    } catch (error) {
      logger.error('Failed to connect user messaging service', error);
      throw error;
    }
  }

  async publishUserRegistered(payload: UserRegisteredEventPayload): Promise<void> {
    await this.publishEvent(payload, USER_EVENTS.USER_REGISTERED.routingKey, USER_EVENTS.USER_REGISTERED.event);
  }

  async publishUserForgotPassword(payload: UserForgotPasswordEventPayload): Promise<void> {
    await this.publishEvent(
      payload,
      USER_EVENTS.USER_FORGOT_PASSWORD.routingKey,
      USER_EVENTS.USER_FORGOT_PASSWORD.event
    );
  }

  private async publishEvent<T>(
    payload: T,
    routingKey: string,
    eventType: string,
    logContext?: Record<string, any>
  ): Promise<void> {
    if (!this.messageBroker) {
      const errorMessage = 'Message broker not initialized';
      logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    try {
      await this.messageBroker.publish(payload, {
        routingKey,
        persistent: true,
        headers: {
          eventType,
          version: MESSAGE_VERSION,
          source: SERVICE_NAME,
          correlationId: this.generateCorrelationId(),
        },
      });

      logger.info('Event published successfully', { eventType, ...(logContext || {}) });
    } catch (error) {
      logger.error('Failed to publish event', error, { eventType, ...(logContext || {}) });
      throw error;
    }
  }

  private generateCorrelationId(): string {
    return `${SERVICE_NAME}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  isHealthy(): boolean {
    return this.messageBroker?.isConnected() === true;
  }

  async disconnect(): Promise<void> {
    if (this.messageBroker) {
      try {
        await this.messageBroker.disconnect();
        this.messageBroker = null;
        logger.info('User messaging service disconnected');
      } catch (error) {
        logger.error('Failed to disconnect user messaging service', error);
        throw error;
      }
    } else {
      logger.warn('User messaging service was not connected');
    }
  }
}

// Export a singleton instance
export const userMessagingService = new UserMessagingService();
