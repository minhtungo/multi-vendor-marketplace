'use client';

import { Elements } from '@stripe/react-stripe-js';
import { Stripe } from '@stripe/stripe-js';

type StripeWrapperProps = {
  stripeKey: string;
  stripePromise: Promise<Stripe | null> | null;
  children: React.ReactNode;
};

export function StripeWrapper({ stripeKey, stripePromise, children }: StripeWrapperProps) {
  if (!stripeKey) {
    throw new Error('Stripe key is missing.');
  }

  if (!stripePromise) {
    throw new Error('Stripe promise is missing.');
  }

  return <Elements stripe={stripePromise}>{children}</Elements>;
}
