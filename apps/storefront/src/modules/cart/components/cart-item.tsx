import { CartItemAction } from '@/modules/cart/components/cart-item-action';
import { type CartItem } from '@repo/types/cart-item';
import { Heading } from '@repo/ui/components/heading';
import Image from 'next/image';

type CartItemProps = React.ComponentProps<'div'> & {
  item: CartItem;
};

export function CartItem({ item }: CartItemProps) {
  return (
    <div className='flex items-start gap-4'>
      <Image
        src={'/placeholder.svg'}
        alt={item.productName}
        width={120}
        height={120}
        className='rounded-lg object-cover shrink-0'
      />

      <div className='flex-1 min-w-0'>
        <div className='flex items-center gap-2 justify-between'>
          <Heading variant='h5' as='h3'>
            {item.productName}
          </Heading>
          <p className='text-lg font-semibold'>${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
        </div>

        <CartItemAction item={item} className='mt-4' />
      </div>
    </div>
  );
}
