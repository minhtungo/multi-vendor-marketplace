import { clientPaths } from '@/config/paths';
import { CartItemAction } from '@/modules/cart/components/cart-item-action';
import { formatPrice } from '@repo/shared-client/utils';
import { type CartItem } from '@repo/types/cart-item';
import { cn } from '@repo/ui/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

type CartItemProps = React.ComponentProps<'div'> & {
  item: CartItem;
  type?: 'preview' | 'full';
};

export function CartItem({ item, type = 'full' }: CartItemProps) {
  const price = type === 'full' ? formatPrice(+item.price * item.quantity) : formatPrice(+item.price);

  return (
    <div className={cn('flex items-start', type === 'preview' ? 'gap-3' : 'gap-6')}>
      <Link href={`${clientPaths.products.root}/${item.productName}`}>
        <Image
          src={'/placeholder.svg'}
          alt={item.productName}
          width={120}
          height={120}
          className={cn('rounded-lg object-cover shrink-0', type === 'preview' && 'size-12')}
        />
      </Link>

      <div className='flex-1 min-w-0'>
        <div className='flex items-start gap-2 justify-between'>
          <Link
            href={`${clientPaths.products.root}/${item.productName}`}
            className={cn('hover:underline', type === 'preview' ? 'text-sm' : 'text-base')}
          >
            {item.productName}
          </Link>
          <div className='flex flex-col gap-1 items-end'>
            <p className={cn('text-lg font-semibold', type === 'preview' && 'text-sm')}>{price}</p>
            {type === 'preview' && <span className='text-xs text-muted-foreground'>x {item.quantity}</span>}
          </div>
        </div>

        {type === 'full' && <CartItemAction item={item} className='mt-4' />}
      </div>
    </div>
  );
}
