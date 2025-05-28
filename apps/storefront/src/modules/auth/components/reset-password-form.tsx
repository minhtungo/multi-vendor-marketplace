'use client';

import { SubmitButton } from '@/components/common/submit-button';
import { clientPaths } from '@/configs/paths';
import { resetPassword } from '@/server/auth/reset-password';
import { type ApiResponse } from '@repo/types/api';
import { FormResponse } from '@repo/ui/components/form-response';
import { Label } from '@repo/ui/components/label';
import { PasswordInput } from '@repo/ui/components/password-input';
import Link from 'next/link';
import { use, useActionState } from 'react';

export function ResetPasswordForm({ token }: { token: string }) {
  const [state, formAction] = useActionState(resetPassword, null);

  return (
    <form action={formAction} className='space-y-6'>
      <input type='hidden' name='token' value={token} />
      <div className='space-y-4'>
        <div className='grid gap-2'>
          <Label>Password</Label>
          <PasswordInput name='password' autoComplete='new-password' required autoFocus />
        </div>
        <div className='grid gap-2'>
          <Label>Confirm Password</Label>
          <PasswordInput name='confirm_password' autoComplete='new-password' required />
        </div>
      </div>
      {state && (
        <FormResponse
          title={state.success ? 'Success' : 'Error'}
          variant={state.success ? 'success' : 'destructive'}
          description={state?.message}
        />
      )}
      <SubmitButton className='w-full'>Reset Password</SubmitButton>
      <div className='text-muted-foreground text-sm'>
        Already have an account?{' '}
        <Link href={clientPaths.auth.signIn} className='underline underline-offset-4'>
          Sign In
        </Link>
      </div>
    </form>
  );
}

export function ResetPasswordContainer({
  tokenPromise,
  token,
}: {
  tokenPromise: Promise<ApiResponse<{ isValid: boolean }>>;
  token: string;
}) {
  const isTokenValid = use(tokenPromise);

  if (!isTokenValid.data?.isValid) {
    return <div>Invalid token</div>;
  }

  return <ResetPasswordForm token={token} />;
}
