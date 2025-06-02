import { CheckoutStepContainer } from '@/modules/checkout/components/common/checkout-step-container';
import { formatPrice } from '@repo/shared-client/utils';
import { Label } from '@repo/ui/components/label';
import { RadioGroup, RadioGroupItem } from '@repo/ui/components/radio-group';

type ShippingMethodProps = {
  shipping: number;
};

export function ShippingMethod({ shipping = 0 }: ShippingMethodProps) {
  return (
    <CheckoutStepContainer step={3} title='Shipping Method' className='space-y-4'>
      <RadioGroup defaultValue='standard' className='space-y-3'>
        <div className='flex items-center justify-between rounded-lg border p-4'>
          <div className='flex items-center space-x-3'>
            <RadioGroupItem value='standard' id='standard' />
            <div>
              <Label htmlFor='standard' className='font-medium'>
                Standard Shipping
              </Label>
              <p className='text-sm text-muted-foreground'>5-7 business days</p>
            </div>
          </div>
          <span className='font-medium'>{formatPrice(shipping)}</span>
        </div>
        <div className='flex items-center justify-between rounded-lg border p-4'>
          <div className='flex items-center space-x-3'>
            <RadioGroupItem value='express' id='express' />
            <div>
              <Label htmlFor='express' className='font-medium'>
                Express Shipping
              </Label>
              <p className='text-sm text-muted-foreground'>2-3 business days</p>
            </div>
          </div>
          <span className='font-medium'>{formatPrice(19.99)}</span>
        </div>
        <div className='flex items-center justify-between rounded-lg border p-4'>
          <div className='flex items-center space-x-3'>
            <RadioGroupItem value='overnight' id='overnight' />
            <div>
              <Label htmlFor='overnight' className='font-medium'>
                Overnight Shipping
              </Label>
              <p className='text-sm text-muted-foreground'>Next business day</p>
            </div>
          </div>
          <span className='font-medium'>{formatPrice(39.99)}</span>
        </div>
      </RadioGroup>
    </CheckoutStepContainer>
  );
}
