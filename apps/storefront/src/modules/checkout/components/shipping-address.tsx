import { CheckoutStepContainer } from '@/modules/checkout/components/common/checkout-step-container';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/select';

type ShippingAddressProps = {};

export function ShippingAddress({}: ShippingAddressProps) {
  return (
    <CheckoutStepContainer step={2} title='Shipping Address' className='space-y-4'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <div className='space-y-2'>
          <Label htmlFor='firstName'>First name</Label>
          <Input id='firstName' placeholder='John' />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='lastName'>Last name</Label>
          <Input id='lastName' placeholder='Doe' />
        </div>
      </div>
      <div className='space-y-2'>
        <Label htmlFor='address'>Address</Label>
        <Input id='address' placeholder='123 Main Street' />
      </div>
      <div className='space-y-2'>
        <Label htmlFor='apartment'>Apartment, suite, etc. (optional)</Label>
        <Input id='apartment' placeholder='Apt 4B' />
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        <div className='space-y-2'>
          <Label htmlFor='city'>City</Label>
          <Input id='city' placeholder='New York' />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='state'>State</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder='Select state' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='ny'>New York</SelectItem>
              <SelectItem value='ca'>California</SelectItem>
              <SelectItem value='tx'>Texas</SelectItem>
              <SelectItem value='fl'>Florida</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='space-y-2'>
          <Label htmlFor='zip'>ZIP code</Label>
          <Input id='zip' placeholder='10001' />
        </div>
      </div>
    </CheckoutStepContainer>
  );
}
