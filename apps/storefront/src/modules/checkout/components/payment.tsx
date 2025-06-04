'use client';

import { CheckoutStepContainer } from '@/modules/checkout/components/common/checkout-step-container';
import { StripeCardContainer } from '@/modules/checkout/components/stripe-card-container';
import { Cart } from '@repo/types/cart';
import { RadioGroup, RadioGroupItem } from '@repo/ui/components/radio-group';
import { CreditCard } from '@repo/ui/icons';

type PaymentProps = {
  cart: Cart;
};

export function Payment({ cart }: PaymentProps) {
  return (
    <CheckoutStepContainer step={3} title='Payment Method' className='space-y-4'>
      <RadioGroup defaultValue='card'>
        <RadioGroupItem
          value='card'
          className='flex w-full px-4 py-8 items-center justify-between data-[state=checked]:border-primary rounded-lg cursor-pointer'
          noIndicator
        >
          <div className='flex flex-col gap-2 items-start'>
            <div className='font-semibold text-sm'> Credit or Debit Card</div>
          </div>
          <CreditCard />
        </RadioGroupItem>
      </RadioGroup>

      <StripeCardContainer />
    </CheckoutStepContainer>
  );
}
