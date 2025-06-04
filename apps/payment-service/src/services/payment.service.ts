import { env } from '@/configs/env';
import { stripe } from '@/lib/stripe';
import { CreatePaymentIntent } from '@/models/payment.model';
import { paymentRepository } from '@/repositories/payment.repository';
import { HTTP_STATUS_CODES } from '@repo/shared-server/core';
import { ServiceResponse } from '@repo/shared-server/lib';

class PaymentService {
  constructor(private readonly paymentRepo = paymentRepository) {}

  public async createConnectAccountLink(vendor: Express.User): Promise<ServiceResponse<{ url: string } | null>> {
    try {
      // const vendor = await vendorRepository.getVendorById(vendorId);

      // if (!vendor) {
      //   return ServiceResponse.failure('Vendor not found', null, HTTP_STATUS_CODES.NOT_FOUND);
      // }

      const account = await stripe.accounts.create({
        type: 'express',
        email: vendor.email,
        country: 'CA',
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
      });

      // await vendorRepository.updateVendor(vendorId, { stripeId: account.id });

      const accountLink = await stripe.accountLinks.create({
        account: account.id,
        refresh_url: `${env.VENDOR_ORIGIN}/payment/connect/refresh`,
        return_url: `${env.VENDOR_ORIGIN}/payment/connect/return`,
        type: 'account_onboarding',
      });

      return ServiceResponse.success(
        'Stripe Connect account link created successfully',
        {
          url: accountLink.url,
        },
        HTTP_STATUS_CODES.CREATED
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return ServiceResponse.failure(errorMessage, null, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }

  public async createPaymentIntent(
    data: CreatePaymentIntent
  ): Promise<ServiceResponse<{ clientSecret: string; id: string } | null>> {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: parseFloat(data.amount) * 100,
        currency: data.currency.toLowerCase(),
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return ServiceResponse.success(
        'Payment intent created successfully',
        { clientSecret: paymentIntent.client_secret!, id: paymentIntent.id },
        HTTP_STATUS_CODES.CREATED
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return ServiceResponse.failure(errorMessage, null, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
  }
}

export const paymentService = new PaymentService();
