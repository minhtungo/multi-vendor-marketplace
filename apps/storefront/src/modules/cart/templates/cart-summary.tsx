import { AcceptedPaymentMethods } from '@/modules/common/components/accepted-payment-methods';
import { formatPrice } from '@repo/shared-client/utils';
import { Cart } from '@repo/types/cart';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent } from '@repo/ui/components/card';
import { Heading } from '@repo/ui/components/heading';
import { Separator } from '@repo/ui/components/separator';
import { Text } from '@repo/ui/components/text';
import { cn } from '@repo/ui/lib/utils';
import Link from 'next/link';

type CartSummaryProps = {
  cart: Cart;
  className?: string;
};

export function CartSummary({ cart, className }: CartSummaryProps) {
  return (
    <div className='space-y-6'>
      <Card className={cn(className)}>
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
            <Link href='/checkout'>Checkout</Link>
          </Button>

          <Button variant='outline' className='w-full mt-3' asChild>
            <Link href='/'>Continue Shopping</Link>
          </Button>
        </CardContent>
      </Card>
      <div className='space-y-2'>
        <Text className='text-sm text-muted-foreground'>Accepted Payment Methods</Text>
        <AcceptedPaymentMethods />
      </div>
    </div>
  );
}
