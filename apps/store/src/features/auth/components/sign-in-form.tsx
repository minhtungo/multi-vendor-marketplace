'use client';

import { signInSchema, useSignInMutation } from '@/features/auth/api/sign-in';
import { OAuthActions } from '@/features/auth/components/common/oauth-actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/form';
import { FormResponse } from '@repo/ui/components/form-response';
import { Input } from '@repo/ui/components/input';
import { LoaderButton } from '@repo/ui/components/loader-button';
import { PasswordInput } from '@repo/ui/components/password-input';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

export function SignInForm({ className }: React.ComponentPropsWithoutRef<'div'>) {
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
        router.push('/');
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <OAuthActions />
        <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
          <span className='bg-background text-muted-foreground relative z-10 px-2'>or</span>
        </div>
        <div className='space-y-4'>
          <FormField
            control={form.control}
            name='email'
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
            name='password'
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
            title='Success'
            variant='success'
            description='You have successfully signed in to your account.'
          />
        )}
        {isError && (
          <FormResponse
            title='Error'
            variant='destructive'
            description={error?.message || 'An error occurred while signing in.'}
          />
        )}

        <LoaderButton isPending={isPending} className='w-full'>
          Sign In
        </LoaderButton>
      </form>
    </Form>
  );
}
