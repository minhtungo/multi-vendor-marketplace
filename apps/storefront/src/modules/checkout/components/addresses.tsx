'use client';

import { BillingAddress } from '@/modules/checkout/components/billing-address';
import { CheckoutStepContainer } from '@/modules/checkout/components/common/checkout-step-container';
import { ShippingAddress } from '@/modules/checkout/components/shipping-address';
import { FormItem } from '@/modules/common/components/form-item';
import { SubmitButton } from '@/modules/common/components/submit-button';
import { setShippingAddress } from '@/server/cart/set-shipping-address';
import { isObjectEqual } from '@/utils/is-equal';
import { useToggleState } from '@repo/shared-client/hooks';
import { Cart } from '@repo/types/cart';
import { Checkbox } from '@repo/ui/components/checkbox';
import { FormResponse } from '@repo/ui/components/form-response';
import { Heading } from '@repo/ui/components/heading';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import { useActionState } from 'react';

type AddressesProps = {
  cart: Cart;
};

export function Addresses({ cart }: AddressesProps) {
  const { state: sameAsBilling, toggle: toggleSameAsBilling } = useToggleState(
    cart?.billingAddress && cart?.shippingAddress ? isObjectEqual(cart?.billingAddress, cart?.shippingAddress) : true
  );
  const [state, formAction] = useActionState(setShippingAddress, null);

  return (
    <CheckoutStepContainer step={1} title='Shipping' className='space-y-4'>
      <Heading size='h6' level='h3'>
        Contact Information
      </Heading>
      <form action={formAction} className='space-y-4'>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <FormItem>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' type='email' name='email' defaultValue={cart?.email} />
          </FormItem>
        </div>
        <ShippingAddress cart={cart} />
        <div className='flex items-center gap-3 mt-6'>
          <Checkbox
            id='sameAsBilling'
            name='same_as_billing'
            onCheckedChange={toggleSameAsBilling}
            checked={sameAsBilling}
          />
          <Label htmlFor='sameAsBilling'>Same as billing address</Label>
        </div>
        {!sameAsBilling && <BillingAddress cart={cart} />}
        {state && (
          <FormResponse
            title={state.success ? 'Success' : 'Error'}
            variant={state.success ? 'success' : 'destructive'}
            description={state?.message}
          />
        )}
        <SubmitButton size='lg' className='mt-4'>
          Continue
        </SubmitButton>
      </form>
    </CheckoutStepContainer>
  );
}
