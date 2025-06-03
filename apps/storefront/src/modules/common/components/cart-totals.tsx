import { formatPrice } from '@repo/shared-client/utils';
import { Cart } from '@repo/types/cart';
import { Separator } from '@repo/ui/components/separator';

type CartTotalsProps = {
  cart: Cart;
};

export function CartTotals({ cart }: CartTotalsProps) {
  return (
    <div className='space-y-2.5 text-sm'>
      <div className='flex justify-between'>
        <span className='text-muted-foreground'>Subtotal</span>
        <span className='font-medium'>{formatPrice(+cart.subtotal)}</span>
      </div>
      <div className='flex justify-between'>
        <span className='text-muted-foreground'>Shipping</span>
        <span className='font-medium'>{formatPrice(0)}</span>
      </div>
      <div className='flex justify-between'>
        <span className='text-muted-foreground'>Tax</span>
        <span className='font-medium'>{formatPrice(0)}</span>
      </div>
      <Separator className='my-3' />
      <div className='flex justify-between font-semibold'>
        <span>Total</span>
        <span>{formatPrice(+cart.total)}</span>
      </div>
    </div>
  );
}
