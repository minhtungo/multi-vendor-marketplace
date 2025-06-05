'use client';

import { Text } from '@repo/ui/components/text';
import { CardElement } from '@stripe/react-stripe-js';
import { StripeCardElementOptions } from '@stripe/stripe-js';

type StripeCardContainerProps = React.ComponentProps<'div'>;

const options: StripeCardElementOptions = {
  classes: {
    base: 'pt-3 border-input border rounded-md pb-1 block w-full h-11 px-4 appearance-none focus:shadow-borders-interactive-with-active  transition-all duration-300 ease-in-out outline-none text-white',
    invalid: 'text-blue-500',
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
