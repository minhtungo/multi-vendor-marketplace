'use client';

import { OAuthActions } from '@/modules/auth/components/common/oauth-actions';
import { SubmitButton } from '@/modules/common/components/submit-button';
import { signUp } from '@/server/auth/sign-up';
import { FormResponse } from '@repo/ui/components/form-response';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import { PasswordInput } from '@repo/ui/components/password-input';
import { cn } from '@repo/ui/lib/utils';
import { useActionState } from 'react';

function SignUpForm({ className }: React.ComponentPropsWithoutRef<'div'>) {
  const [state, formAction] = useActionState(signUp, null);

  return (
    <div className={cn(className)}>
      <form action={formAction} className='space-y-6'>
        <OAuthActions />
        <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
          <span className='bg-background text-muted-foreground relative z-10 px-2'>or</span>
        </div>
        <div className='space-y-4'>
          <div className='grid gap-2'>
            <Label>Email</Label>
            <Input name='email' type='email' autoComplete='email' required />
          </div>
          <div className='grid gap-2'>
            <Label>Password</Label>
            <PasswordInput name='password' autoComplete='new-password' required />
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
        <SubmitButton className='w-full'>Sign Up</SubmitButton>
      </form>
    </div>
  );
}

export { SignUpForm };
