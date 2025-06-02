import { CartItem } from '@/modules/cart/components/cart-item';
import { type CartItem as CartItemType } from '@repo/types/cart-item';
import { Card, CardContent } from '@repo/ui/components/card';
import { Separator } from '@repo/ui/components/separator';
import { cn } from '@repo/ui/lib/utils';
import React from 'react';

type CartItemsProps = {
  cartItems: CartItemType[];
  className?: string;
  type?: 'preview' | 'full';
};

export function CartItems({ cartItems, className, type = 'full' }: CartItemsProps) {
  return (
    <Card className={cn(type === 'preview' && 'py-0 shadow-none border-none', className)}>
      <CardContent className={cn(type === 'preview' && 'px-0')}>
        {cartItems.map((item, index) => (
          <React.Fragment key={`cart-item-${item.id}`}>
            <CartItem item={item} type={type} />
            {index < cartItems.length - 1 && <Separator className={cn(type === 'preview' ? 'my-3' : 'my-6')} />}
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
}
