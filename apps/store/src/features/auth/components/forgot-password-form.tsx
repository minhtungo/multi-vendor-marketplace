'use client';

import { forgotPasswordSchema, useForgotPasswordMutation } from '@/features/auth/api/forgot-password';
import { OAuthActions } from '@/features/auth/components/common/oauth-actions';
import { client } from '@/configs/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/form';
import { FormResponse } from '@repo/ui/components/form-response';
import { Input } from '@repo/ui/components/input';
import { LoaderButton } from '@repo/ui/components/loader-button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

export function ForgotPasswordForm({ className }: React.ComponentPropsWithoutRef<'div'>) {
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });
  const router = useRouter();

  const { mutate: forgotPassword, isPending, isSuccess, isError, error } = useForgotPasswordMutation();

  const onSubmit = (data: z.infer<typeof forgotPasswordSchema>) => {
    forgotPassword(data, {
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
          Send Reset Password Link
        </LoaderButton>
        <div className='text-muted-foreground text-sm'>
          Already have an account?{' '}
          <Link href={client.path.signIn} className='underline underline-offset-4'>
            Sign In
          </Link>
        </div>
      </form>
    </Form>
  );
}
