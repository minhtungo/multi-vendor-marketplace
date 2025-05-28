'use client';

import { SubmitButton } from '@/components/common/submit-button';
import { clientPaths } from '@/configs/paths';
import { forgotPassword } from '@/features/auth/api/forgot-password';
import { FormResponse } from '@repo/ui/components/form-response';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import Link from 'next/link';
import { useActionState } from 'react';

export function ForgotPasswordForm() {
  const [state, formAction] = useActionState(forgotPassword, null);

  return (
    <form action={formAction} className='space-y-6'>
      <div className='space-y-4'>
        <div className='grid gap-2'>
          <Label>Email</Label>
          <Input name='email' type='email' autoComplete='email' required autoFocus />
        </div>
      </div>
      {state && (
        <FormResponse
          title={state.success ? 'Success' : 'Error'}
          variant={state.success ? 'success' : 'destructive'}
          description={state?.message}
        />
      )}
      <SubmitButton className='w-full'>Send Reset Password Link</SubmitButton>
      <div className='text-muted-foreground text-sm'>
        Already have an account?{' '}
        <Link href={clientPaths.auth.signIn} className='underline underline-offset-4'>
          Sign In
        </Link>
      </div>
    </form>
  );
}
