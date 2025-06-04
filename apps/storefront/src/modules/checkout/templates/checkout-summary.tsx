import { CartItems } from '@/modules/cart/templates/cart-items';
import { PaymentButton } from '@/modules/checkout/components/payment-button';
import { CartTotals } from '@/modules/common/components/cart-totals';
import { Cart } from '@repo/types/cart';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Separator } from '@repo/ui/components/separator';
import { Lock } from '@repo/ui/icons';
import { cn } from '@repo/ui/lib/utils';

type CheckoutSummaryProps = {
  cart: Cart;
  className?: string;
};

export function CheckoutSummary({ cart, className }: CheckoutSummaryProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <CartItems cartItems={cart.items} type='preview' />

        <Separator />

        <CartTotals cart={cart} />

        <PaymentButton cart={cart} />

        <div className='flex items-center justify-center space-x-2 text-xs text-muted-foreground'>
          <Lock className='h-3 w-3' />
          <span>Your payment information is secure and encrypted</span>
        </div>
      </CardContent>
    </Card>
  );
}
