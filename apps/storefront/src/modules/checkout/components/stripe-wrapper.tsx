'use client';

import { Elements } from '@stripe/react-stripe-js';
import { Stripe, StripeElementsOptions } from '@stripe/stripe-js';

type StripeWrapperProps = {
  stripeKey: string;
  stripePromise: Promise<Stripe | null> | null;
  children: React.ReactNode;
};

const options: StripeElementsOptions = {
  mode: 'payment',
  currency: 'usd',
  amount: 1000,
};

export function StripeWrapper({ stripeKey, stripePromise, children }: StripeWrapperProps) {
  if (!stripeKey) {
    throw new Error('Stripe key is missing.');
  }

  if (!stripePromise) {
    throw new Error('Stripe promise is missing.');
  }

  return (
    <Elements options={{ ...options }} stripe={stripePromise}>
      {children}
    </Elements>
  );
}
