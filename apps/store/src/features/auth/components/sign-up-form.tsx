'use client';

import { signUpSchema, useSignUpMutation } from '@/features/auth/api/sign-up';
import { OAuthActions } from '@/features/auth/components/common/oauth-actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/form';
import { FormResponse } from '@repo/ui/components/form-response';
import { Input } from '@repo/ui/components/input';
import { LoaderButton } from '@repo/ui/components/loader-button';
import { PasswordInput } from '@repo/ui/components/password-input';
import { cn } from '@repo/ui/lib/utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { OTPForm } from './otp-form';

const signUpInputSchema = signUpSchema
  .extend({
    confirm_password: z.string().min(1, 'Confirm password is required'),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

const defaultUserInput: z.infer<typeof signUpInputSchema> = {
  email: '',
  password: '',
  confirm_password: '',
};

function SignUpForm({ className }: React.ComponentPropsWithoutRef<'div'>) {
  const [showOTP, setShowOTP] = useState(false);
  const [userInput, setUserInput] = useState<z.infer<typeof signUpInputSchema>>(defaultUserInput);

  const form = useForm<z.infer<typeof signUpInputSchema>>({
    resolver: zodResolver(signUpInputSchema),
    defaultValues: defaultUserInput,
  });

  const { mutate: signUp, isPending, isSuccess, isError, error } = useSignUpMutation();

  const onSubmit = (data: z.infer<typeof signUpInputSchema>) => {
    setUserInput(data);
    signUp(data, {
      onSuccess: () => {
        setShowOTP(true);
      },
    });
  };

  if (isSuccess && !showOTP) {
    setShowOTP(true);
  }

  return (
    <div className={cn(className)}>
      {!showOTP ? (
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
            {isError && (
              <FormResponse
                title='Error'
                variant='destructive'
                description={error?.message || 'An error occurred while signing up.'}
              />
            )}

            <LoaderButton isPending={isPending} className='w-full'>
              Sign Up
            </LoaderButton>
          </form>
        </Form>
      ) : (
        <OTPForm userInput={userInput} />
      )}
    </div>
  );
}

export { SignUpForm };
