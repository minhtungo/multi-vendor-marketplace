'use server';

import { serverPaths } from '@/config/paths';
import { api } from '@/lib/api-client';
import { checkoutSteps } from '@/lib/constants/checkout';
import { redirect } from 'next/navigation';

export async function initiatePaymentSession() {
  try {
    const response = await api.post<{ clientSecret: string }>(serverPaths.payment.initiatePaymentSession);

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

  redirect(`/checkout?step=${checkoutSteps[1].slug}`);
}
