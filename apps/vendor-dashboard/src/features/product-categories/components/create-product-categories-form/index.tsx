import {
  createProductCategorySchema,
  useCreateProductCategory,
} from '@/features/product-categories/api/create-product-category';
import { normalizeServerError } from '@/utils/error';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/components/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/form';
import { FormResponse } from '@repo/ui/components/form-response';
import { Input } from '@repo/ui/components/input';
import { LoaderButton } from '@repo/ui/components/loader-button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/select';
import { Textarea } from '@repo/ui/components/textarea';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

const defaultFormValues: z.infer<typeof createProductCategorySchema> = {
  name: '',
  description: '',
  handle: '',
  status: 'active',
};

export function CreateProductCategoriesForm({}: React.ComponentPropsWithoutRef<'div'>) {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof createProductCategorySchema>>({
    resolver: zodResolver(createProductCategorySchema),
    defaultValues: defaultFormValues,
  });

  const { mutate: createProductCategory, isPending, isSuccess, isError, error } = useCreateProductCategory();

  const onSubmit = (data: z.infer<typeof createProductCategorySchema>) => {
    createProductCategory(data, {
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
            name="handle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Handle</FormLabel>
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
            description="Product category has been created successfully."
          />
        )}
        {isError && (
          <FormResponse
            title="Error"
            variant="destructive"
            description={normalizeServerError(error, 'An error occurred while creating the product category.')}
          />
        )}
        <div className="flex items-center justify-end gap-2">
          <Button onClick={() => navigate({ to: '/products' })} variant="outline">
            Cancel
          </Button>
          <LoaderButton isPending={isPending}>Save</LoaderButton>
        </div>
      </form>
    </Form>
  );
}
