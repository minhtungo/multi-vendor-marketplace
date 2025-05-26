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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/select';
import { Textarea } from '@repo/ui/components/textarea';
import { useRouter } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

const defaultFormValues: z.infer<typeof createProductSchema> = {
  name: '',
  description: '',
  price: 0,
  sku: '',
  images: [],
  categories: [],
  tags: [],
  quantity: 0,
  status: 'draft',
  type: 'physical',
  slug: '',
  compareAtPrice: 0,
};

export function CreateProductForm({}: React.ComponentPropsWithoutRef<'div'>) {
  const router = useRouter();
  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: defaultFormValues,
  });

  const { mutate: createProduct, isPending, isSuccess, isError, error } = useCreateProduct();

  const onSubmit = (data: z.infer<typeof createProductSchema>) => {
    createProduct(data, {
      onSuccess: () => {
        form.reset(defaultFormValues);
      },
    });
  };

  console.log('images', form.watch('images'));

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
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="product-slug" />
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
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="physical">Physical</SelectItem>
                      <SelectItem value="digital">Digital</SelectItem>
                    </SelectContent>
                  </Select>
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
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <ProductCategoriesSelection
                    onValueChange={(value) => field.onChange(value.split(',').map((v) => v.trim()))}
                    className="w-full"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value.join(', ')}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value
                            .split(',')
                            .map((tag: string) => tag.trim())
                            .filter(Boolean),
                        )
                      }
                      placeholder="Separated by commas..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="compareAtPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Compare at Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
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
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Images</FormLabel>
              <FormControl>
                <UploadProductImages onImageAdded={(url) => field.onChange([...field.value, url])} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
          <Button onClick={() => router.history.back()} variant="outline">
            Cancel
          </Button>
          <LoaderButton isPending={isPending}>Save</LoaderButton>
        </div>
      </form>
    </Form>
  );
}
