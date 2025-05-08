import { client } from '@/configs/client';
import { Button } from '@repo/ui/components/button';
import { cn } from '@repo/ui/lib/utils';
import Link from 'next/link';

export function AuthButtons({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex items-center gap-2', className)} {...props}>
      <Button size='sm' asChild>
        <Link href={client.path.signIn} className={cn('text-muted-foreground text-sm', className)}>
          Sign In
        </Link>
      </Button>
      <Button variant='outline' size='sm' asChild>
        <Link href={client.path.signUp} className={cn('text-muted-foreground text-sm', className)}>
          Sign Up
        </Link>
      </Button>
    </div>
  );
}
