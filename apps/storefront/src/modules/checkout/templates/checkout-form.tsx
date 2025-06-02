import { ContactInformation } from '@/modules/checkout/components/contact-information';
import { PaymentMethod } from '@/modules/checkout/components/payment-method';
import { ShippingAddress } from '@/modules/checkout/components/shipping-address';
import { ShippingMethod } from '@/modules/checkout/components/shipping-method';
import { Cart } from '@repo/types/cart';
import { cn } from '@repo/ui/lib/utils';

type CheckoutFormProps = {
  cart: Cart;
  className?: string;
};

export function CheckoutForm({ cart, className }: CheckoutFormProps) {
  return (
    <div className={cn('space-y-6', className)}>
      <ContactInformation />
      <ShippingAddress />
      <ShippingMethod shipping={0} />
      <PaymentMethod />
    </div>
  );
}
