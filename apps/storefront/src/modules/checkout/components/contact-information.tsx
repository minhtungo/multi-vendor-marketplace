import { FormItem } from '@/modules/common/components/form-item';
import { CheckoutStepContainer } from '@/modules/checkout/components/common/checkout-step-container';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';

type ContactInformationProps = {};

export function ContactInformation({}: ContactInformationProps) {
  return (
    <CheckoutStepContainer step={1} title='Contact Information' className='space-y-4'>
      <div className='grid grid-cols-2 gap-4'>
        <FormItem>
          <Label htmlFor='email'>Email address</Label>
          <Input id='email' type='email' />
        </FormItem>
        <FormItem>
          <Label htmlFor='phone'>Phone number</Label>
          <Input id='phone' type='tel' />
        </FormItem>
      </div>
    </CheckoutStepContainer>
  );
}
