import { AuthConsumer } from '@repo/messaging';
import { vendorRepository } from '@/repositories/vendor.repository';
import { logger } from '@/utils/logger';

class VendorAuthConsumer extends AuthConsumer {
  constructor() {
    super('vendor-service', 'vendor.#');
  }

  async onVendorRegistered(data: { email: string; password: string; timestamp: number }): Promise<void> {
    try {
      await vendorRepository.createVendor({
        email: data.email,
        password: data.password,
        name: data.email.split('@')[0],
        status: 'pending',
      });
      logger.info(`Vendor registered: ${data.email}`);
    } catch (error) {
      logger.error(`Error handling vendor registration: ${error}`);
      throw error;
    }
  }

  async onVendorPasswordReset(data: { email: string; password: string; timestamp: number }): Promise<void> {
    try {
      await vendorRepository.updateVendorPassword(data.email, data.password);
      logger.info(`Vendor password reset: ${data.email}`);
    } catch (error) {
      logger.error(`Error handling vendor password reset: ${error}`);
      throw error;
    }
  }
}

export const vendorAuthConsumer = new VendorAuthConsumer();
