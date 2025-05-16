import { CreateProductForm } from '@/features/product/components/create-product-form';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/product/new')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto max-w-md">
      <CreateProductForm />
    </div>
  );
}
