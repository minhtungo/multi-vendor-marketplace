import { Button } from '@repo/ui/components/button';
import { Google } from '@repo/ui/components/icons/google';
import { cn } from '@repo/ui/lib/utils';
import type { ComponentProps } from 'react';

export function OAuthActions({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={cn('grid gap-2 w-full', className)} {...props}>
      <Button variant='outline' type='button' className='w-full'>
        <Google />
        Continue with Google
        <span className='sr-only'>Sign in with Google</span>
      </Button>
    </div>
  );
}
