'use client';

import { placeOrder } from '@/server/cart/place-order';
import { Cart } from '@repo/types/cart';
import { FormResponse } from '@repo/ui/components/form-response';
import { LoaderButton } from '@repo/ui/components/loader-button';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';

type PaymentButtonProps = {
  cart: Cart;
  clientSecret: string;
};

export function PaymentButton({ cart, clientSecret }: PaymentButtonProps) {
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [cardComplete, setCardComplete] = useState(false);

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

  useEffect(() => {
    if (!elements) return;

    const cardElement = elements.getElement('card');

    if (!cardElement) return;

    const handleChange = (event: any) => {
      setErrorMessage(event.error?.message || null);
      setCardComplete(event.complete);
    };

    cardElement.on('change', handleChange);

    return () => {
      cardElement.off('change', handleChange);
    };
  }, [elements]);

  const disabled = !stripe || !elements || !cardComplete;

  const handlePayment = async () => {
    setSubmitting(true);

    const cardElement = elements?.getElement('card');

    if (!stripe || !elements || !cardElement || !cart) {
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
      <LoaderButton
        isPending={submitting}
        disabled={disabled}
        onClick={handlePayment}
        variant='default'
        className='w-full'
      >
        {submitting ? 'Processing...' : 'Place Order'}
      </LoaderButton>
      {errorMessage && <FormResponse title='Error' description={errorMessage} variant='destructive' />}
    </>
  );
}
