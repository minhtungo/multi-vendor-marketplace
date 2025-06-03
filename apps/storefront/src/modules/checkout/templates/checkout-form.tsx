import { PaymentMethod } from '@/modules/checkout/components/payment-method';
import { Addresses } from '@/modules/checkout/components/addresses';
import { DeliveryOptions } from '@/modules/checkout/components/delivery-options';
import { Cart } from '@repo/types/cart';
import { cn } from '@repo/ui/lib/utils';
import { CheckoutStepSlug } from '@/lib/constants/checkout';

type CheckoutFormProps = {
  cart: Cart;
  currentStep: CheckoutStepSlug;
  className?: string;
};

export function CheckoutForm({ cart, currentStep, className }: CheckoutFormProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {currentStep === 'shipping' && <Addresses cart={cart} />}
      {currentStep === 'delivery' && <DeliveryOptions cart={cart} />}
      {currentStep === 'payment' && <PaymentMethod cart={cart} />}
    </div>
  );
}
