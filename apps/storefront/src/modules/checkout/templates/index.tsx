import { ContactInformation } from '@/modules/checkout/components/contact-information';
import { OrderSummary } from '@/modules/checkout/components/order-summary';
import { PaymentMethod } from '@/modules/checkout/components/payment-method';
import { ShippingAddress } from '@/modules/checkout/components/shipping-address';
import { ShippingMethod } from '@/modules/checkout/components/shipping-method';

type CheckoutTemplateProps = {};

const cartItems = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    price: 129.99,
    quantity: 1,
    image: '/placeholder.svg?height=80&width=80',
  },
  {
    id: 2,
    name: 'Premium Cotton T-Shirt',
    price: 39.99,
    quantity: 2,
    image: '/placeholder.svg?height=80&width=80',
  },
  {
    id: 3,
    name: 'Leather Wallet',
    price: 79.99,
    quantity: 1,
    image: '/placeholder.svg?height=80&width=80',
  },
];

const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
const shipping = 9.99;
const tax = subtotal * 0.08;
const total = subtotal + shipping + tax;

export function CheckoutTemplate({}: CheckoutTemplateProps) {
  return (
    <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
      <div className='space-y-6 lg:col-span-2'>
        <ContactInformation />
        <ShippingAddress />
        <ShippingMethod shipping={shipping} />
        <PaymentMethod />
      </div>

      {/* Right Column - Order Summary */}
      <div className='lg:sticky lg:top-8 lg:self-start'>
        <OrderSummary cartItems={cartItems} subtotal={subtotal} shipping={shipping} tax={tax} total={total} />
      </div>
    </div>
  );
}
