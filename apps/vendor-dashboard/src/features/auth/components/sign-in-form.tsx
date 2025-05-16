import { signInSchema, useSignInMutation } from '@/features/auth/api/sign-in';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/form';
import { FormResponse } from '@repo/ui/components/form-response';
import { Input } from '@repo/ui/components/input';
import { LoaderButton } from '@repo/ui/components/loader-button';
import { PasswordInput } from '@repo/ui/components/password-input';
import { useRouter } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

export function SignInForm({}: React.ComponentPropsWithoutRef<'div'>) {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const router = useRouter();

  const { mutate: signIn, isPending, isSuccess, isError, error } = useSignInMutation();

  const onSubmit = (data: z.infer<typeof signInSchema>) => {
    signIn(data, {
      onSuccess: () => {
        router.navigate({ to: '/' });
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} autoFocus />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            description={(error?.response?.data?.message as string) || 'An error occurred while signing in.'}
          />
        )}

        <LoaderButton isPending={isPending} className="w-full">
          Sign In
        </LoaderButton>
      </form>
    </Form>
  );
}
