'use client';

import { SubmitButton } from '@/components/common/submit-button';
import { signIn } from '@/features/auth/api/sign-in';
import { OAuthActions } from '@/features/auth/components/common/oauth-actions';
import { FormResponse } from '@repo/ui/components/form-response';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import { PasswordInput } from '@repo/ui/components/password-input';
import { useActionState } from 'react';

export function SignInForm() {
  const [state, formAction] = useActionState(signIn, null);

  return (
    <form action={formAction} className='space-y-6'>
      <OAuthActions />
      <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
        <span className='bg-background text-muted-foreground relative z-10 px-2'>or</span>
      </div>
      <div className='space-y-4'>
        <div className='grid gap-2'>
          <Label>Email</Label>
          <Input name='email' type='email' autoComplete='email' required data-testid='email-input' />
        </div>
        <div className='grid gap-2'>
          <Label>Password</Label>
          <PasswordInput name='password' autoComplete='current-password' required data-testid='password-input' />
        </div>
      </div>
      {state && (
        <FormResponse
          title={state.success ? 'Success' : 'Error'}
          variant={state.success ? 'success' : 'destructive'}
          description={state?.message}
        />
      )}
      <SubmitButton className='w-full'>Sign In</SubmitButton>
    </form>
  );
}
