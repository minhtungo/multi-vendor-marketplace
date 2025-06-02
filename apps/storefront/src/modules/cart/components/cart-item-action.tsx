'use client';

import { useDebounce } from '@repo/shared-client/hooks';
import { ProductQuantityAction } from '@/modules/products/components/product-quantity-action';
import { deleteCartItem } from '@/server/cart-item/delete-cart-item';
import { updateCartItem } from '@/server/cart-item/update-cart-item';
import { type CartItem } from '@repo/types/cart-item';
import { Button } from '@repo/ui/components/button';
import { Trash2 } from '@repo/ui/icons';
import { cn } from '@repo/ui/lib/utils';
import { useState } from 'react';
import { toast } from 'sonner';

type CartItemActionProps = React.ComponentProps<'div'> & {
  item: CartItem;
  className?: string;
};

export function CartItemAction({ item, className }: CartItemActionProps) {
  const [quantity, setQuantity] = useState(item.quantity);

  const debouncedQuantityChange = useDebounce(updateCartItem, 100);

  const handleQuantityChange = (quantity: number) => {
    setQuantity(quantity);
    debouncedQuantityChange(item.id, { quantity });
  };

  const handleDelete = async () => {
    await deleteCartItem(item.id);
    toast.success('Item removed from cart');
  };

  return (
    <div className={cn('flex items-center justify-between', className)}>
      <ProductQuantityAction quantity={quantity} onQuantityChange={handleQuantityChange} />

      <Button variant='ghost' size='icon' onClick={handleDelete}>
        <Trash2 />
      </Button>
    </div>
  );
}
