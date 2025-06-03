'use client';

import { checkoutSteps } from '@/lib/constants/checkout';
import { BillingAddress } from '@/modules/checkout/components/billing-address';
import { CheckoutStepContainer } from '@/modules/checkout/components/common/checkout-step-container';
import { ShippingAddress } from '@/modules/checkout/components/shipping-address';
import { FormItem } from '@/modules/common/components/form-item';
import { useToggleState } from '@repo/shared-client/hooks';
import { Cart } from '@repo/types/cart';
import { Button } from '@repo/ui/components/button';
import { Checkbox } from '@repo/ui/components/checkbox';
import { Heading } from '@repo/ui/components/heading';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import { usePathname, useRouter } from 'next/navigation';

type AddressesProps = {
  cart: Cart;
};

export function Addresses({ cart }: AddressesProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState();

  const handleContinue = () => {
    router.push(pathname + `?step=${checkoutSteps[1].slug}`);
  };

  return (
    <CheckoutStepContainer step={1} title='Shipping' className='space-y-4'>
      <Heading as='h3' variant='h6'>
        Contact Information
      </Heading>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <FormItem>
          <Label htmlFor='email'>Email</Label>
          <Input id='email' type='email' />
        </FormItem>
      </div>
      <ShippingAddress />
      <div className='flex items-center gap-3 mt-6'>
        <Checkbox id='sameAsBilling' onCheckedChange={toggleSameAsBilling} />
        <Label htmlFor='sameAsBilling'>Same as billing address</Label>
      </div>
      {!sameAsBilling && <BillingAddress className='mt-6' />}
      <Button size='lg' className='mt-4' onClick={handleContinue}>
        Continue
      </Button>
    </CheckoutStepContainer>
  );
}
