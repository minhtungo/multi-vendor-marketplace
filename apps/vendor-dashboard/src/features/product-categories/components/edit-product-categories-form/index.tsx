import {
  editProductCategorySchema,
  useEditProductCategory,
} from '@/features/product-categories/api/edit-product-category';
import { normalizeServerError } from '@/utils/error';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ProductCategory } from '@repo/types/product-category';
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

type EditProductCategoriesFormProps = {
  productCategory: ProductCategory;
};

export function EditProductCategoriesForm({ productCategory }: EditProductCategoriesFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof editProductCategorySchema>>({
    resolver: zodResolver(editProductCategorySchema),
    defaultValues: {
      name: productCategory.name,
      slug: productCategory.slug,
      description: productCategory.description || '',
      status: productCategory.status,
    },
  });

  const {
    mutate: updateProductCategory,
    isPending,
    isSuccess,
    isError,
    error,
  } = useEditProductCategory(productCategory.id);

  const onSubmit = (data: z.infer<typeof editProductCategorySchema>) => {
    updateProductCategory(
      {
        id: productCategory.id,
        data,
      },
      {
        onSuccess: () => {
          form.reset();
        },
      },
    );
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
                <FormLabel>Category Name</FormLabel>
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
                  <Input {...field} placeholder="category-slug" />
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
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {isSuccess && (
          <FormResponse
            title="Success"
            variant="success"
            description="Product category has been updated successfully."
          />
        )}
        {isError && (
          <FormResponse
            title="Error"
            variant="destructive"
            description={normalizeServerError(error, 'An error occurred while updating the product category.')}
          />
        )}
        <div className="flex items-center justify-end gap-2">
          <Button onClick={() => router.history.back()} variant="outline">
            Cancel
          </Button>
          <LoaderButton isPending={isPending}>Update</LoaderButton>
        </div>
      </form>
    </Form>
  );
}
