import { createProductSchema, useCreateProduct } from '@/features/product/api/create-product';
import { ProductCategoriesSelection } from '@/features/product/components/product-categories-selection';
import { UploadProductImages } from '@/features/product/components/upload-product-images';
import { normalizeServerError } from '@/utils/error';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/components/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/form';
import { FormResponse } from '@repo/ui/components/form-response';
import { Input } from '@repo/ui/components/input';
import { LoaderButton } from '@repo/ui/components/loader-button';
import { Textarea } from '@repo/ui/components/textarea';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

const defaultFormValues = {
  name: '',
  description: '',
  price: 0,
  sku: '',
  images: [],
  categories: [],
  tags: [],
  quantity: 0,
};

export function CreateProductForm({}: React.ComponentPropsWithoutRef<'div'>) {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: defaultFormValues,
  });

  const { mutate: createProduct, isPending, isSuccess, isError, error } = useCreateProduct();

  const onSubmit = (data: z.infer<typeof createProductSchema>) => {
    console.log('data', data);
    createProduct(data, {
      onSuccess: () => {
        form.reset(defaultFormValues);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} autoFocus />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sku"
            render={({ field }) => (
              <FormItem>
                <FormLabel>SKU</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Media</FormLabel>
                <FormControl>
                  <UploadProductImages {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categories</FormLabel>
                <ProductCategoriesSelection onValueChange={field.onChange} className="w-full" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input type="number" {...field} onChange={(e) => field.onChange(Number(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {isSuccess && (
          <FormResponse title="Success" variant="success" description="Product has been created successfully." />
        )}
        {isError && (
          <FormResponse
            title="Error"
            variant="destructive"
            description={normalizeServerError(error, 'An error occurred while creating the product.')}
          />
        )}
        <div className="flex items-center justify-end gap-2">
          <Button onClick={() => navigate({ to: '/products' })} variant="outline">
            Cancel
          </Button>
          <LoaderButton isPending={isPending}>Create Product</LoaderButton>
        </div>
      </form>
    </Form>
  );
}
