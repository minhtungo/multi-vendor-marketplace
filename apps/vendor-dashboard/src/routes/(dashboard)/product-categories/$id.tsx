import {
  getProductCategoryQueryOptions,
  useGetProductCategoryQuery,
} from '@/features/product-categories/api/get-product-category';
import { EditProductCategoriesSheet } from '@/features/product-categories/components/edit-product-categories-form/edit-product-categories-sheet';
import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Label } from '@repo/ui/components/label';
import { createFileRoute } from '@tanstack/react-router';
import { Pen } from 'lucide-react';

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
  const { id } = Route.useParams();
  const { data: response } = useGetProductCategoryQuery(id);
  const category = response?.data;

  if (!category) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">{category.name}</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant={category.status === 'active' ? 'default' : 'secondary'}>
              {category.status === 'active' ? 'Active' : 'Inactive'}
            </Badge>
            <EditProductCategoriesSheet
              triggerButton={
                <Button variant="ghost" size="icon">
                  <Pen />
                </Button>
              }
              productCategory={category}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug</Label>
            <p className="text-muted-foreground text-sm">{category.slug}</p>
          </div>
        </div>
        {category.description && (
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <p className="text-muted-foreground text-sm">{category.description}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
