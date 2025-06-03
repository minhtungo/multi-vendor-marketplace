'use client';

import { checkoutSteps, SHIPPING_METHODS } from '@/lib/constants/checkout';
import { CheckoutStepContainer } from '@/modules/checkout/components/common/checkout-step-container';
import { formatPrice } from '@repo/shared-client/utils';
import { Cart } from '@repo/types/cart';
import { Button } from '@repo/ui/components/button';
import { RadioGroup, RadioGroupItem } from '@repo/ui/components/radio-group';
import { Truck } from '@repo/ui/icons';
import { usePathname, useRouter } from 'next/navigation';

type DeliveryOptionsProps = {
  cart: Cart;
};

export function DeliveryOptions({ cart }: DeliveryOptionsProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleContinue = () => {
    router.push(pathname + `?step=${checkoutSteps[2].slug}`);
  };

  return (
    <CheckoutStepContainer step={2} title='Delivery'>
      <RadioGroup defaultValue='standard'>
        {SHIPPING_METHODS.map((method) => (
          <RadioGroupItem
            value={`${method.id}-shipping-method`}
            className='flex w-full px-4 py-8 items-center justify-between data-[state=checked]:border-primary rounded-lg cursor-pointer'
            noIndicator
          >
            <div className='flex flex-col gap-2 items-start'>
              <div className='font-semibold text-sm'>{method.name}</div>
              <p className='text-sm text-muted-foreground'>{formatPrice(method.price)}</p>
            </div>
            <Truck />
          </RadioGroupItem>
        ))}
      </RadioGroup>
      <Button size='lg' className='mt-6' onClick={handleContinue}>
        Continue
      </Button>
    </CheckoutStepContainer>
  );
}
