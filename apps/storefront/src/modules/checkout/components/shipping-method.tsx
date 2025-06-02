import { CheckoutStepContainer } from '@/modules/checkout/components/common/checkout-step-container';
import { formatPrice } from '@repo/shared-client/utils';
import { RadioGroup, RadioGroupItem } from '@repo/ui/components/radio-group';

type ShippingMethodProps = {};

const SHIPPING_METHODS = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    price: 0,
  },
  {
    id: 'express',
    name: 'Express Shipping',
    price: 19.99,
  },
];

export function ShippingMethod({}: ShippingMethodProps) {
  return (
    <CheckoutStepContainer step={3} title='Shipping Method'>
      <RadioGroup defaultValue='standard'>
        {SHIPPING_METHODS.map((method) => (
          <RadioGroupItem
            value={method.id}
            className='flex w-full px-4 py-6 items-center justify-between data-[state=checked]:border-primary rounded-lg cursor-pointer'
            noIndicator
          >
            <div className='font-semibold text-sm'>{method.name}</div>
            <p className='text-sm text-muted-foreground'>{formatPrice(method.price)}</p>
          </RadioGroupItem>
        ))}
      </RadioGroup>
    </CheckoutStepContainer>
  );
}
