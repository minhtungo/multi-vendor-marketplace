import { FormItem } from '@/modules/common/components/form-item';
import { Heading } from '@repo/ui/components/heading';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/select';
import { cn } from '@repo/ui/lib/utils';
type BillingAddressProps = {
  className?: string;
};

export function BillingAddress({ className }: BillingAddressProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <Heading as='h3' variant='h6'>
        Billing Address
      </Heading>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <FormItem>
          <Label htmlFor='firstName'>First name</Label>
          <Input id='firstName' />
        </FormItem>
        <FormItem>
          <Label htmlFor='lastName'>Last name</Label>
          <Input id='lastName' />
        </FormItem>
      </div>
      <FormItem>
        <Label htmlFor='address'>Address</Label>
        <Input id='address' />
      </FormItem>
      <FormItem>
        <Label htmlFor='apartment'>Apartment, suite, etc. (optional)</Label>
        <Input id='apartment' />
      </FormItem>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        <FormItem>
          <Label htmlFor='city'>City</Label>
          <Input id='city' />
        </FormItem>
        <FormItem>
          <Label htmlFor='state'>State</Label>
          <Select>
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
          <Input id='zip' />
        </FormItem>
      </div>
    </div>
  );
}
