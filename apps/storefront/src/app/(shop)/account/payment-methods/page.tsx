import { CardDescription, CardTitle } from '@repo/ui/components/card';

export default function PaymentMethodsPage() {
  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>Manage your payment methods</CardDescription>
      </div>
    </div>
  );
}
