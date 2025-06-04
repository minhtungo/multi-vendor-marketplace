'use client';

import { Text } from '@repo/ui/components/text';
import { CardElement } from '@stripe/react-stripe-js';
import { StripeCardElementOptions } from '@stripe/stripe-js';

type StripeCardContainerProps = React.ComponentProps<'div'>;

const options: StripeCardElementOptions = {
  style: {
    base: {
      fontFamily: 'Inter, sans-serif',
      color: '#424270',
      '::placeholder': {
        color: 'rgb(107 114 128)',
      },
    },
  },
  classes: {
    base: 'pt-3 pb-1 block w-full h-11 px-4 mt-0 bg-ui-bg-field border rounded-md appearance-none focus:outline-none focus:ring-0 focus:shadow-borders-interactive-with-active border-ui-border-base hover:bg-ui-bg-field-hover transition-all duration-300 ease-in-out',
  },
};

export function StripeCardContainer({}: StripeCardContainerProps) {
  return (
    <div className='my-4'>
      <Text>Enter your your card details</Text>
      <CardElement options={options} />
    </div>
  );
}
