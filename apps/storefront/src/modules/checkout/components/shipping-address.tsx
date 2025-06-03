import { FormItem } from '@/modules/common/components/form-item';
import { Cart } from '@repo/types/cart';
import { Heading } from '@repo/ui/components/heading';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/select';
import { useState } from 'react';

type ShippingAddressProps = {
  cart: Cart;
};

export function ShippingAddress({ cart }: ShippingAddressProps) {
  const [formData, setFormData] = useState<Record<string, any>>({
    'shipping_address.first_name': cart?.shippingAddress?.firstName || '',
    'shipping_address.last_name': cart?.shippingAddress?.lastName || '',
    'shipping_address.address_1': cart?.shippingAddress?.address1 || '',
    'shipping_address.postal_code': cart?.shippingAddress?.postalCode || '',
    'shipping_address.city': cart?.shippingAddress?.city || '',
    'shipping_address.state': cart?.shippingAddress?.state || '',
    email: cart?.email || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className='space-y-4 mt-6'>
      <Heading as='h3' variant='h6'>
        Shipping Address
      </Heading>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <FormItem>
          <Label htmlFor='firstName'>First name</Label>
          <Input
            id='firstName'
            value={formData['shipping_address.first_name']}
            onChange={handleChange}
            autoComplete='given-name'
            name='shipping_address.first_name'
            required
          />
        </FormItem>
        <FormItem>
          <Label htmlFor='lastName'>Last name</Label>
          <Input
            id='lastName'
            value={formData['shipping_address.last_name']}
            onChange={handleChange}
            autoComplete='family-name'
            name='shipping_address.last_name'
            required
          />
        </FormItem>
      </div>
      <FormItem>
        <Label htmlFor='address'>Address</Label>
        <Input
          id='address'
          value={formData['shipping_address.address_1']}
          onChange={handleChange}
          autoComplete='address-line1'
          name='shipping_address.address_1'
          required
        />
      </FormItem>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        <FormItem>
          <Label htmlFor='city'>City</Label>
          <Input
            id='city'
            value={formData['shipping_address.city']}
            onChange={handleChange}
            autoComplete='address-level2'
            name='shipping_address.city'
            required
          />
        </FormItem>
        <FormItem>
          <Label htmlFor='state'>State</Label>
          <Select
            onValueChange={(value) => setFormData({ ...formData, ['shipping_address.state']: value })}
            autoComplete='address-level1'
            value={formData['shipping_address.state']}
            name='shipping_address.state'
            required
          >
            <SelectTrigger className='w-full'>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='ny'>New York</SelectItem>
              <SelectItem value='ca'>California</SelectItem>
              <SelectItem value='tx'>Texas</SelectItem>
              <SelectItem value='fl'>Florida</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
        <FormItem>
          <Label htmlFor='zip'>ZIP code</Label>
          <Input
            id='zip'
            value={formData['shipping_address.postal_code']}
            onChange={handleChange}
            autoComplete='postal-code'
            name='shipping_address.postal_code'
            required
          />
        </FormItem>
      </div>
    </div>
  );
}
