import { createProductSchema, useCreateProductMutation } from '@/features/product/api/create-product';
import { ProductCategoriesSelection } from '@/features/product/components/product-categories-selection';
import { UploadProductImages } from '@/features/product/components/upload-product-images';
import { normalizeServerError } from '@/utils/error';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/form';
import { FormResponse } from '@repo/ui/components/form-response';
import { Input } from '@repo/ui/components/input';
import { LoaderButton } from '@repo/ui/components/loader-button';
import { Textarea } from '@repo/ui/components/textarea';
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
  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: defaultFormValues,
  });

  const { mutate: createProduct, isPending, isSuccess, isError, error } = useCreateProductMutation();

  const onSubmit = (data: z.infer<typeof createProductSchema>) => {
    createProduct(data, {
      onSuccess: () => {
        form.reset(defaultFormValues);
      },
    });
  };

  return (
    <Form {...form}>
      <UploadProductImages />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} autoFocus />
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
            name="categories"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categories</FormLabel>
                <ProductCategoriesSelection onValueChange={field.onChange} />
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

        <LoaderButton isPending={isPending} className="w-full">
          Create Product
        </LoaderButton>
      </form>
    </Form>
  );
}
