'use server';

import { serverPaths } from '@/config/paths';
import { api } from '@/lib/api-client';

type InitiatePaymentSessionProps = {
  currency: string;
  amount: string;
};

export async function initiatePaymentSession({ currency, amount }: InitiatePaymentSessionProps) {
  try {
    const response = await api.post<{ clientSecret: string }>(serverPaths.payment.initiatePaymentSession, {
      currency,
      amount,
    });

    if (!response.success) {
      throw new Error('Failed to initiate payment session');
    }

    const { clientSecret } = response.data;

    return {
      success: true,
      message: 'Payment session initiated successfully',
      data: { clientSecret },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
}
