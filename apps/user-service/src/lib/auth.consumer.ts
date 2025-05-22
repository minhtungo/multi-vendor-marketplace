import { AuthConsumer } from '@repo/messaging';
import { userRepository } from '@/repositories/user.repository';
import { logger } from '@/utils/logger';

class UserAuthConsumer extends AuthConsumer {
  constructor() {
    super('user-service', 'user.#');
  }

  async onUserRegistered(data: { email: string; password: string; timestamp: number }): Promise<void> {
    try {
      await userRepository.createUser({
        email: data.email,
        password: data.password,
        name: data.email.split('@')[0],
        role: 'user',
      });
      logger.info(`User registered: ${data.email}`);
    } catch (error) {
      logger.error(`Error handling user registration: ${error}`);
      throw error;
    }
  }

  async onUserPasswordReset(data: { userId: string; password: string; timestamp: number }): Promise<void> {
    try {
      await userRepository.updateUserPassword(data.userId, data.password);
      logger.info(`User password reset: ${data.userId}`);
    } catch (error) {
      logger.error(`Error handling user password reset: ${error}`);
      throw error;
    }
  }
}

export const userAuthConsumer = new UserAuthConsumer();
