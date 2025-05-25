import { getProductCategoryQueryOptions } from '@/features/product-categories/api/get-product-category';
import { Card, CardHeader, CardTitle } from '@repo/ui/components/card';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/product-categories/$id')({
  component: RouteComponent,
  beforeLoad: async ({ context, params }) => {
    const { id } = params;
    return context.queryClient.ensureQueryData(getProductCategoryQueryOptions(id));
  },
  loader: async ({ context, params }) => {
    const { id } = params;
    return context.queryClient.ensureQueryData(getProductCategoryQueryOptions(id));
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData?.data.name,
      },
    ],
  }),
});

function RouteComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Category</CardTitle>
      </CardHeader>
    </Card>
  );
}
