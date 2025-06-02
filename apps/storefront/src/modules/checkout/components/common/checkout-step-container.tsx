import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/components/card';
import { cn } from '@repo/ui/lib/utils';

type CheckoutStepContainerProps = {
  step: number;
  title: string;
  children: React.ReactNode;
  className?: string;
};

export function CheckoutStepContainer({ step, title, children, className }: CheckoutStepContainerProps) {
  return (
    <Card className='h-fit'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <div className='flex h-8 w-8 items-center justify-center rounded-full border text-sm font-medium'>{step}</div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className={cn(className)}>{children}</CardContent>
    </Card>
  );
}
