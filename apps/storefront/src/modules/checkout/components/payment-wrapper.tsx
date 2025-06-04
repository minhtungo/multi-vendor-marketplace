'use client';

import { env } from '@/config/env';
import { StripeWrapper } from '@/modules/checkout/components/stripe-wrapper';
import { Cart } from '@repo/types/cart';
import { loadStripe } from '@stripe/stripe-js';

type PaymentWrapperProps = {
  cart: Cart;
  children: React.ReactNode;
};

const stripeKey = env.NEXT_PUBLIC_STRIPE_KEY;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

export async function PaymentWrapper({ children }: PaymentWrapperProps) {
  return (
    <StripeWrapper stripeKey={stripeKey} stripePromise={stripePromise}>
      {children}
    </StripeWrapper>
  );
}
