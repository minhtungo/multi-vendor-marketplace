import { CardDescription, CardTitle } from '@repo/ui/components/card';

export default function OrdersPage() {
  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        <CardTitle>Orders</CardTitle>
        <CardDescription>Manage your orders</CardDescription>
      </div>
    </div>
  );
}
