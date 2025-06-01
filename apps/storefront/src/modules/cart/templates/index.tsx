import { CartItems } from '@/modules/cart/templates/cart-items';
import { CartSummary } from '@/modules/cart/templates/cart-summary';
import { retrieveCart } from '@/server/cart/retrieve-cart';
import { Heading } from '@repo/ui/components/heading';
import { ShoppingBag } from '@repo/ui/icons';

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
        <CartItems cartItems={cartItems} className='lg:col-span-2 h-fit' />
        <CartSummary cart={cart} className='lg:col-span-1 sticky top-8 h-fit' />
      </div>
    </div>
  );
}
