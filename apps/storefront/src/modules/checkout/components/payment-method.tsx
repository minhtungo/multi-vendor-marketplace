import { CheckoutStepContainer } from '@/modules/checkout/components/common/checkout-step-container';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import { RadioGroup, RadioGroupItem } from '@repo/ui/components/radio-group';
import { CreditCard } from '@repo/ui/icons';

type PaymentMethodProps = {};

export function PaymentMethod({}: PaymentMethodProps) {
  return (
    <CheckoutStepContainer step={4} title='Payment Method' className='space-y-4'>
      <RadioGroup defaultValue='card' className='space-y-3'>
        <div className='flex items-center space-x-3 rounded-lg border p-4'>
          <RadioGroupItem value='card' id='card' />
          <CreditCard className='h-5 w-5' />
          <Label htmlFor='card' className='font-medium'>
            Credit or Debit Card
          </Label>
        </div>
      </RadioGroup>

      <div className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='cardNumber'>Card number</Label>
          <Input id='cardNumber' placeholder='1234 5678 9012 3456' />
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='expiry'>Expiry date</Label>
            <Input id='expiry' placeholder='MM/YY' />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='cvc'>CVC</Label>
            <Input id='cvc' placeholder='123' />
          </div>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='cardName'>Name on card</Label>
          <Input id='cardName' placeholder='John Doe' />
        </div>
      </div>
    </CheckoutStepContainer>
  );
}
