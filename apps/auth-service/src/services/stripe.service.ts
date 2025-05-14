import { env } from '@/configs/env';
import { stripe } from '@/lib/stripe';
import { vendorRepository } from '@/repositories/vendor.repository';
import { ServiceResponse } from '@repo/server/lib/service-response';
import { StatusCodes } from 'http-status-codes';

class StripeService {
  public async createConnectAccountLink(vendorId: string): Promise<ServiceResponse<{ url: string } | null>> {
    try {
      const vendor = await vendorRepository.getVendorById(vendorId);

      if (!vendor) {
        return ServiceResponse.failure('Vendor not found', null, StatusCodes.NOT_FOUND);
      }

      const account = await stripe.accounts.create({
        type: 'express',
        email: vendor.email,
        country: 'CA',
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
      });

      await vendorRepository.updateVendor(vendorId, { stripeId: account.id });

      const accountLink = await stripe.accountLinks.create({
        account: account.id,
        refresh_url: `${env.APP_ORIGIN}/stripe/connect/refresh`,
        return_url: `${env.APP_ORIGIN}/stripe/connect/return`,
        type: 'account_onboarding',
      });

      return ServiceResponse.success(
        'Stripe Connect account link created successfully',
        {
          url: accountLink.url,
        },
        StatusCodes.CREATED
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return ServiceResponse.failure(errorMessage, null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}

export const stripeService = new StripeService();
