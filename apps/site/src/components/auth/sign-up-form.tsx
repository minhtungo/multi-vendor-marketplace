'use client';

import { signUpSchema, useSignUpMutation } from '@/api/sign-up';
import { OAuthActions } from '@/components/auth/oauth-actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/form';
import { FormResponse } from '@repo/ui/components/form-response';
import { Input } from '@repo/ui/components/input';
import { LoaderButton } from '@repo/ui/components/loader-button';
import { PasswordInput } from '@repo/ui/components/password-input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const signUpInputSchema = signUpSchema
  .extend({
    confirm_password: z.string().min(1, 'Confirm password is required'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

export function SignUpForm({ className }: React.ComponentPropsWithoutRef<'div'>) {
  const form = useForm<z.infer<typeof signUpInputSchema>>({
    resolver: zodResolver(signUpInputSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm_password: '',
    },
  });

  const { mutate: signUp, isPending, isSuccess, isError, error } = useSignUpMutation();

  const onSubmit = (data: z.infer<typeof signUpInputSchema>) => {
    signUp(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <OAuthActions />
        <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
          <span className='bg-background text-muted-foreground relative z-10 px-2'>or continue with</span>
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
          <FormField
            control={form.control}
            name='confirm_password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
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
            description='If the email you provided is not already in use, you will receive a verification email. The verification link expires in 10 minutes.'
          />
        )}

        <LoaderButton isPending={isPending} className='w-full'>
          Sign Up
        </LoaderButton>
      </form>
    </Form>
  );
}
