import { CheckoutStepContainer } from '@/modules/checkout/components/common/checkout-step-container';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import { RadioGroup, RadioGroupItem } from '@repo/ui/components/radio-group';
import { CreditCard } from '@repo/ui/icons';
import { Cart } from '@repo/types/cart';
import { FormItem } from '@/modules/common/components/form-item';

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

      <div className='grid grid-cols-2 gap-4'>
        <FormItem>
          <Label htmlFor='cardName'>Name on Card</Label>
          <Input id='cardName' placeholder='John Doe' />
        </FormItem>
        <FormItem>
          <Label htmlFor='cardNumber'>Card Number</Label>
          <Input id='cardNumber' placeholder='1234 5678 9012 3456' />
        </FormItem>
        <FormItem>
          <Label htmlFor='expiry'>Expiry Date</Label>
          <Input id='expiry' placeholder='MM/YY' />
        </FormItem>
        <FormItem>
          <Label htmlFor='cvc'>CVC</Label>
          <Input id='cvc' placeholder='123' />
        </FormItem>
      </div>
    </CheckoutStepContainer>
  );
}
