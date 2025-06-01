import { CartItem } from '@/modules/cart/components/cart-item';
import { retrieveCart } from '@/server/cart/retrieve-cart';
import { formatPrice } from '@repo/shared/utils';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent } from '@repo/ui/components/card';
import { Heading } from '@repo/ui/components/heading';
import { Separator } from '@repo/ui/components/separator';
import { ShoppingBag } from '@repo/ui/icons';
import Link from 'next/link';
import React from 'react';

export async function CartTemplate() {
  const cart = await retrieveCart();
  const cartItems = cart?.items;

  if (!cartItems || cartItems.length === 0) {
    return <div>No items in cart</div>;
  }

  return (
    <div className='w-full'>
      <div className='flex items-center gap-2 mb-8'>
        <ShoppingBag className='h-6 w-6' />
        <Heading variant='h5' as='h1'>
          Shopping Cart
        </Heading>
        <span className='text-sm text-muted-foreground'>({cartItems.length} items)</span>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-2'>
          <Card>
            <CardContent>
              {cartItems.map((item, index) => (
                <React.Fragment key={`cart-item-${item.id}`}>
                  <CartItem item={item} />
                  {index < cartItems.length - 1 && <Separator className='my-6' />}
                </React.Fragment>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className='lg:col-span-1'>
          <Card className='sticky top-8'>
            <CardContent>
              <Heading variant='h5' as='h3' className='mb-4'>
                Order Summary
              </Heading>

              <div className='space-y-3'>
                <div className='flex justify-between text-sm'>
                  <span className='text-muted-foreground'>Subtotal</span>
                  <span className='font-medium'>{formatPrice(parseFloat(cart.subtotal))}</span>
                </div>

                <div className='flex justify-between text-sm'>
                  <span className='text-muted-foreground'>Shipping</span>
                  <span className='font-medium'>{formatPrice(9.99)}</span>
                </div>

                {/* <div className='flex justify-between text-sm'>
                  <span className='text-muted-foreground'>Tax</span>
                  <span className='font-medium'>{formatPrice(parseFloat(cart.))}</span>
                </div> */}

                <Separator />

                <div className='flex justify-between text-base font-semibold'>
                  <span>Total</span>
                  <span>{formatPrice(parseFloat(cart.total))}</span>
                </div>
              </div>

              <Button className='w-full mt-6' size='lg' asChild>
                <Link href='/checkout'>Proceed to Checkout</Link>
              </Button>

              <Button variant='outline' className='w-full mt-3' asChild>
                <Link href='/'>Continue Shopping</Link>
              </Button>

              <div className='mt-6 text-center'>
                <p className='text-xs text-muted-foreground'>Free shipping on orders over $75</p>
                <p className='text-xs text-muted-foreground mt-1'>30-day return policy</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
