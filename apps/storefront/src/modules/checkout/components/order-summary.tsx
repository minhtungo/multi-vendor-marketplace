import { CheckoutStepContainer } from '@/modules/checkout/components/common/checkout-step-container';
import { formatPrice } from '@repo/shared-client/utils';
import { Button } from '@repo/ui/components/button';
import { Separator } from '@repo/ui/components/separator';
import { Lock } from '@repo/ui/icons';
import Image from 'next/image';

type OrderSummaryProps = {
  cartItems: any;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
};

export function OrderSummary({ cartItems, subtotal, shipping, tax, total }: OrderSummaryProps) {
  return (
    <CheckoutStepContainer step={4} title='Order Summary' className='space-y-4'>
      <div className='space-y-4'>
        {cartItems.map((item) => (
          <div key={item.id} className='flex items-center space-x-4'>
            <div className='relative h-16 w-16 overflow-hidden rounded-lg border'>
              <Image src={item.image || '/placeholder.svg'} alt={item.name} fill className='object-cover' />
              <div className='absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-white'>
                {item.quantity}
              </div>
            </div>
            <div className='flex-1 min-w-0'>
              <h4 className='text-sm font-medium text-muted-foreground truncate'>{item.name}</h4>
              <p className='text-sm text-muted-foreground'>Qty: {item.quantity}</p>
            </div>
            <div className='text-sm font-medium text-muted-foreground'>{formatPrice(item.price * item.quantity)}</div>
          </div>
        ))}
      </div>

      <Separator />

      {/* Order Totals */}
      <div className='space-y-2'>
        <div className='flex justify-between text-sm'>
          <span className='text-muted-foreground'>Subtotal</span>
          <span className='font-medium'>{formatPrice(subtotal)}</span>
        </div>
        <div className='flex justify-between text-sm'>
          <span className='text-muted-foreground'>Shipping</span>
          <span className='font-medium'>{formatPrice(shipping)}</span>
        </div>
        <div className='flex justify-between text-sm'>
          <span className='text-muted-foreground'>Tax</span>
          <span className='font-medium'>{formatPrice(tax)}</span>
        </div>
        <Separator />
        <div className='flex justify-between text-lg font-semibold'>
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      <Button className='w-full'>
        <Lock className=' h-4 w-4' />
        Complete Order
      </Button>

      {/* Security Notice */}
      <div className='flex items-center justify-center space-x-2 text-xs text-muted-foreground'>
        <Lock className='h-3 w-3' />
        <span>Your payment information is secure and encrypted</span>
      </div>
    </CheckoutStepContainer>
  );
}
