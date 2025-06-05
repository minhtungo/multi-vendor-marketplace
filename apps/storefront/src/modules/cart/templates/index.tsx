import { CartItems } from '@/modules/cart/templates/cart-items';
import { CartSummary } from '@/modules/cart/templates/cart-summary';
import { AcceptedPaymentMethods } from '@/modules/common/components/accepted-payment-methods';
import { retrieveCart } from '@/server/cart/retrieve-cart';
import { Button, buttonVariants } from '@repo/ui/components/button';
import { Heading } from '@repo/ui/components/heading';
import { Text } from '@repo/ui/components/text';
import { ShoppingBag } from '@repo/ui/icons';
import Link from 'next/link';

export async function CartTemplate() {
  const cart = await retrieveCart();
  const cartItems = cart?.items;

  if (!cartItems || cartItems.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className='w-full'>
      <div className='flex items-center gap-2 mb-8'>
        <ShoppingBag className='h-6 w-6' />
        <Heading size='h5' level='h1'>
          Shopping Cart
        </Heading>
        <span className='text-sm text-muted-foreground'>({cartItems.length} items)</span>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <CartItems cartItems={cartItems} className='lg:col-span-2 h-fit' />
        <CartSummary cart={cart} className='lg:col-span-1 sticky top-8 h-fit' />
      </div>
    </div>
  );
}

function CartEmpty() {
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <ShoppingBag className='size-10' />
      <Heading size='h5' level='h1' className='mt-4'>
        Your cart is empty
      </Heading>
      <Text className='text-muted-foreground mt-4'>
        Once you add something to your bag - it will appear here. Ready to get started?
      </Text>
      <Link href='/' className={buttonVariants({ className: 'mt-6', size: 'lg' })}>
        <Text>Get started</Text>
      </Link>
    </div>
  );
}
