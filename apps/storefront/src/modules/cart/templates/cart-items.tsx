import { CartItem } from '@/modules/cart/components/cart-item';
import { type CartItem as CartItemType } from '@repo/types/cart-item';
import { Card, CardContent } from '@repo/ui/components/card';
import { Separator } from '@repo/ui/components/separator';
import { cn } from '@repo/ui/lib/utils';
import React from 'react';

type CartItemsProps = {
  cartItems: CartItemType[];
  className?: string;
};

export function CartItems({ cartItems, className }: CartItemsProps) {
  return (
    <Card className={cn(className)}>
      <CardContent>
        {cartItems.map((item, index) => (
          <React.Fragment key={`cart-item-${item.id}`}>
            <CartItem item={item} />
            {index < cartItems.length - 1 && <Separator className='my-6' />}
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
}
