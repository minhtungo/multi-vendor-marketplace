import { createProductSchema, useCreateProductMutation } from '@/features/product/api/create-product';
import { UploadProductImages } from '@/features/product/components/upload-product-images';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/form';
import { FormResponse } from '@repo/ui/components/form-response';
import { Input } from '@repo/ui/components/input';
import { LoaderButton } from '@repo/ui/components/loader-button';
import { Textarea } from '@repo/ui/components/textarea';
import { type Tag } from 'emblor';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

const defaultFormValues = {
  name: '',
  description: '',
  price: 0,
  image: '',
  tags: [],
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
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel className="text-left">Tags</FormLabel>
                <FormControl>
                  <TagInput
                    {...field}
                    placeholder="Enter a topic"
                    tags={tags}
                    className="sm:min-w-[450px]"
                    setTags={(newTags) => {
                      console.log(newTags);
                      const newTagsArray = newTags.map((tag) => ({
                        id: tag.id,
                        name: tag.name,
                      }));
                      console.log(newTagsArray);
                      setTags(newTagsArray);
                    }}
                    inlineTags={false}
                    inputFieldPosition="top"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>
        {isSuccess && (
          <FormResponse
            title="Success"
            variant="success"
            description="You have successfully signed in to your account."
          />
        )}
        {isError && (
          <FormResponse
            title="Error"
            variant="destructive"
            description={error?.message || 'An error occurred while signing in.'}
          />
        )}

        <LoaderButton isPending={isPending} className="w-full">
          Create Product
        </LoaderButton>
      </form>
    </Form>
  );
}
