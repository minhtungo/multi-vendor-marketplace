import { Button, type buttonVariants } from '@repo/ui/components/button';
import { Spinner } from '@repo/ui/components/spinner';
import type { VariantProps } from 'class-variance-authority';

type LoaderButtonProps = React.ComponentProps<'button'> & {
  isPending: boolean;
  variant?: VariantProps<typeof buttonVariants>['variant'];
};

export function LoaderButton({
  className,
  children,
  isPending,
  disabled,
  variant,
  type = 'submit',
  ...props
}: LoaderButtonProps) {
  return (
    <Button type={type} disabled={disabled || isPending} className={className} variant={variant} {...props}>
      {children}
      {isPending && <Spinner />}
    </Button>
  );
}
