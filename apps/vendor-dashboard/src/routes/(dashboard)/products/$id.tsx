import { getProductQueryOptions, useGetProduct } from '@/features/product/api/get-product';
import { EditProductSheet } from '@/features/product/components/edit-product-form/edit-product-sheet';
import { formatPrice } from '@/utils/price';
import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/components/card';
import { Label } from '@repo/ui/components/label';
import { Package, Pen } from '@repo/ui/icons';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(dashboard)/products/$id')({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const { id } = params;
    return context.queryClient.ensureQueryData(getProductQueryOptions(id));
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData?.name,
      },
    ],
  }),
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { data: product } = useGetProduct(id);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">{product.name}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant={product.status === 'published' ? 'default' : 'secondary'}>
                {product.status === 'published' ? 'Published' : 'Draft'}
              </Badge>
              <EditProductSheet
                triggerButton={
                  <Button variant="ghost" size="icon">
                    <Pen />
                  </Button>
                }
                product={product}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sku">SKU</Label>
              <p className="text-muted-foreground text-sm">{product.sku}</p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <p className="text-muted-foreground text-sm">{product.description}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">URL Slug</Label>
            <p className="text-muted-foreground text-sm">{product.slug}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Product Type</Label>
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span className="text-sm capitalize">{product.type}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing & Inventory */}
      <Card>
        <CardHeader>
          <CardTitle>Pricing & Inventory</CardTitle>
          <CardDescription>Set your product pricing and track inventory</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <p className="text-muted-foreground text-sm">{formatPrice(product.price)}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="compareAtPrice">Compare at Price</Label>
              <p className="text-muted-foreground text-sm">
                {product.compareAtPrice ? formatPrice(product.compareAtPrice) : 'Not set'}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <p className="text-muted-foreground text-sm">{product.quantity} in stock</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Product Images</CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {product.images?.map((image: string, index: number) => (
              <div key={index} className="group relative">
                <div className="bg-muted aspect-square overflow-hidden rounded-lg border">
                  <img
                    src={image || '/placeholder.svg'}
                    alt={`Product image ${index + 1}`}
                    width={200}
                    height={200}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
