'use client';

import { SHIPPING_METHODS } from '@/lib/constants/checkout';
import { CheckoutStepContainer } from '@/modules/checkout/components/common/checkout-step-container';
import { SubmitButton } from '@/modules/common/components/submit-button';
import { setShippingMethod } from '@/server/cart/set-shipping-method';
import { formatPrice } from '@repo/shared-client/utils';
import { Cart } from '@repo/types/cart';
import { FormResponse } from '@repo/ui/components/form-response';
import { RadioGroup, RadioGroupItem } from '@repo/ui/components/radio-group';
import { Truck } from '@repo/ui/icons';
import { useActionState, useState } from 'react';

type DeliveryOptionsProps = {
  cart: Cart;
};

export function DeliveryOptions({ cart }: DeliveryOptionsProps) {
  const [state, formAction] = useActionState(setShippingMethod, null);
  const [selectedMethod, setSelectedMethod] = useState(SHIPPING_METHODS[0]);

  const handleValueChange = (value: string) => {
    const method = SHIPPING_METHODS.find((m) => m.id === value);
    if (method) {
      setSelectedMethod(method);
    }
  };

  return (
    <CheckoutStepContainer step={2} title='Delivery'>
      <form action={formAction}>
        <RadioGroup
          defaultValue={cart.shippingMethod?.id || SHIPPING_METHODS[0].id}
          name='shipping_method_id'
          onValueChange={handleValueChange}
        >
          {SHIPPING_METHODS.map((method) => (
            <RadioGroupItem
              key={`${method.id}-shipping-method`}
              value={method.id}
              className='flex w-full px-4 py-8 items-center justify-between data-[state=checked]:border-primary rounded-lg cursor-pointer'
              noIndicator
            >
              <div className='flex flex-col gap-2 items-start'>
                <div className='font-semibold text-sm'>{method.name}</div>
                <p className='text-sm text-muted-foreground'>{formatPrice(Number(method.price))}</p>
              </div>
              <Truck />
            </RadioGroupItem>
          ))}
        </RadioGroup>

        <input type='hidden' name='shipping_method_price' value={selectedMethod.price} />
        <input type='hidden' name='shipping_method_name' value={selectedMethod.name} />

        {state && !state.success && <FormResponse title='Error' variant='destructive' description={state?.message} />}
        <SubmitButton size='lg' className='mt-6'>
          Continue
        </SubmitButton>
      </form>
    </CheckoutStepContainer>
  );
}
