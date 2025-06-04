import { buttonVariants } from '@repo/ui/components/button';
import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { cn } from '@repo/ui/lib/utils';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex h-screen items-center justify-center container'>
      <Card className='gap-4 justify-center text-center'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>Page Not Found</CardTitle>
        </CardHeader>
        <CardContent className='flex flex-col gap-6'>
          <p>The page you are looking for does not exist. Please check the URL and try again.</p>
          <Link className={cn(buttonVariants({ variant: 'default' }), 'w-fit mx-auto')} href='/'>
            Go to Home
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
