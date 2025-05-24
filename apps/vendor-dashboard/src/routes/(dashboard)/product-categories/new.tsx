import { CreateProductCategoriesForm } from '@/features/product-categories/components/create-product-categories-form';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/product-categories/new')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <CreateProductCategoriesForm />
    </div>
  );
}
