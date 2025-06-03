import { CheckoutStepSlug } from '@/lib/constants/checkout';
import { CartItems } from '@/modules/cart/templates/cart-items';
import { CartTotals } from '@/modules/common/components/cart-totals';
import { Cart } from '@repo/types/cart';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Separator } from '@repo/ui/components/separator';
import { Lock } from '@repo/ui/icons';
import { cn } from '@repo/ui/lib/utils';

type CheckoutSummaryProps = {
  cart: Cart;
  currentStep: CheckoutStepSlug;
  className?: string;
};

export function CheckoutSummary({ cart, currentStep, className }: CheckoutSummaryProps) {
  return (
    <Card className={cn('', className)}>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <CartItems cartItems={cart.items} type='preview' />

        <Separator />

        <CartTotals cart={cart} />

        {currentStep === 'payment' && <Button className='w-full mt-2'>Complete Order</Button>}

        <div className='flex items-center justify-center space-x-2 text-xs text-muted-foreground'>
          <Lock className='h-3 w-3' />
          <span>Your payment information is secure and encrypted</span>
        </div>
      </CardContent>
    </Card>
  );
}
