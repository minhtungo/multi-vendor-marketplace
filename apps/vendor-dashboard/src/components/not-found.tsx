import { Button, buttonVariants } from '@repo/ui/components/button';
import { cn } from '@repo/ui/lib/utils';
import { Link } from '@tanstack/react-router';

export function NotFound({ children }: { children?: any }) {
  return (
    <div className="container flex h-screen flex-col items-center justify-center space-y-4">
      <div className="text-foreground text-xl font-semibold">
        {children || <p>The page you are looking for does not exist.</p>}
      </div>
      <p className="flex flex-wrap items-center gap-2">
        <Button onClick={() => window.history.back()}>Go back</Button>
        <Link to="/" className={cn(buttonVariants({ variant: 'outline' }))}>
          Start Over
        </Link>
      </p>
    </div>
  );
}
