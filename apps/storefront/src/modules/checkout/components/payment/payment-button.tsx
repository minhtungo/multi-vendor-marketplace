'use client';

import { placeOrder } from '@/server/cart/place-order';
import { Cart } from '@repo/types/cart';
import { FormResponse } from '@repo/ui/components/form-response';
import { LoaderButton } from '@repo/ui/components/loader-button';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';

type PaymentButtonProps = {
  cart: Cart;
  clientSecret: string;
};

export function PaymentButton({ cart, clientSecret }: PaymentButtonProps) {
  const isReady = cart && cart.shippingAddress && cart.billingAddress && cart.shippingMethod && !!cart.email;

  return (
    <div className='flex flex-col gap-4'>
      <StripePaymentButton cart={cart} isReady={isReady} clientSecret={clientSecret} />
    </div>
  );
}

type StripePaymentButtonProps = {
  cart: Cart;
  isReady: boolean;
  clientSecret: string;
};

function StripePaymentButton({ cart, isReady, clientSecret }: StripePaymentButtonProps) {
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onPaymentCompleted = async () => {
    await placeOrder()
      .catch((error) => {
        setErrorMessage(error.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const stripe = useStripe();
  const elements = useElements();
  const cardElement = elements?.getElement('card');

  const disabled = !stripe || !elements || !isReady;

  const handlePayment = async () => {
    setSubmitting(true);

    if (!stripe || !elements || !cardElement) {
      setErrorMessage('Missing payment details');
      setSubmitting(false);
      return;
    }

    await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${cart.billingAddress.firstName} ${cart.billingAddress.lastName}`,
            email: cart.email,
            address: {
              city: cart.billingAddress.city,
              line1: cart.billingAddress.address1,
              postal_code: cart.billingAddress.postalCode,
              state: cart.billingAddress.state,
            },
          },
        },
      })
      .then(({ error, paymentIntent }) => {
        if (error) {
          const paymentIntentError = error.payment_intent;

          if (
            (paymentIntentError && paymentIntentError.status === 'requires_capture') ||
            (paymentIntentError && paymentIntentError.status === 'succeeded')
          ) {
            onPaymentCompleted();
          }

          setErrorMessage(error?.message || 'Something went wrong');
          return;
        }

        if ((paymentIntent && paymentIntent.status === 'requires_capture') || paymentIntent?.status === 'succeeded') {
          return onPaymentCompleted();
        }

        return;
      });
  };

  return (
    <>
      <LoaderButton isPending={submitting} disabled={disabled} onClick={handlePayment} variant='default'>
        {submitting ? 'Processing...' : 'Place Order'}
      </LoaderButton>
      {errorMessage && <FormResponse title='Error' description={errorMessage} variant='destructive' />}
    </>
  );
}
