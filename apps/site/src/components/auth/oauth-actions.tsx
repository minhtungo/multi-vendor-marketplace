import { Button } from '@repo/ui/components/button';
import { Google } from '@repo/ui/components/icons/google';
import { cn } from '@repo/ui/lib/utils';
import { Facebook } from 'lucide-react';
import type { ComponentProps } from 'react';

export function OAuthActions({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={cn('grid gap-2 sm:grid-cols-2', className)} {...props}>
      <Button variant='outline' type='button' className='w-full'>
        <Facebook className='size-5' />
        Facebook
        <span className='sr-only'>Sign in with Facebook</span>
      </Button>
      <Button variant='outline' type='button' className='w-full'>
        <Google />
        Google
        <span className='sr-only'>Sign in with Google</span>
      </Button>
    </div>
  );
}
