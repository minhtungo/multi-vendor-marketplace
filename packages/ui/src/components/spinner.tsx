import { cn } from '@repo/ui/lib/utils';
import { type VariantProps, cva } from 'class-variance-authority';
import { Loader2Icon } from 'lucide-react';

const spinnerVariants = cva('animate-spin', {
  variants: {
    size: {
      default: 'h-4 w-4',
      sm: 'size-3',
      md: 'size-5',
      lg: 'size-6',
      xl: 'size-8',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export type SpinnerProps = VariantProps<typeof spinnerVariants> & React.ComponentProps<'svg'>;

const Spinner = ({ className, size }: SpinnerProps) => {
  return <Loader2Icon className={cn(spinnerVariants({ size, className }))} />;
};

Spinner.displayName = 'Spinner';

export { Spinner };
