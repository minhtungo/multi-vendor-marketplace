import { CheckoutStepContainer } from '@/modules/checkout/components/common/checkout-step-container';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';

type ContactInformationProps = {};

export function ContactInformation({}: ContactInformationProps) {
  return (
    <CheckoutStepContainer step={1} title='Contact Information' className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='email'>Email address</Label>
        <Input id='email' type='email' placeholder='john@example.com' />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='phone'>Phone number</Label>
        <Input id='phone' type='tel' placeholder='+1 (555) 123-4567' />
      </div>
    </CheckoutStepContainer>
  );
}
