import { CreateProductForm } from '@/features/product/components/create-product-form';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/products/new')({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: 'New Product',
      },
    ],
  }),
});

function RouteComponent() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <CreateProductForm />
    </div>
  );
}
