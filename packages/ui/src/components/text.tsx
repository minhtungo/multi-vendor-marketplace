import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@repo/ui/lib/utils';

const textVariants = cva('leading-7', {
  variants: {
    variant: {
      default: 'text-base',
      small: 'text-sm',
      large: 'text-lg',
      xl: 'text-xl',
      muted: 'text-muted-foreground',
      primary: 'text-primary',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

type TextVariantProps = VariantProps<typeof textVariants>;

type TextProps = Omit<React.HTMLAttributes<HTMLParagraphElement>, 'color'> & {
  variant?: TextVariantProps['variant'];
  as?: 'p' | 'span' | 'div';
};

function Text({ className, as = 'p', ...props }: TextProps) {
  const Comp = as;

  return <Comp className={cn(textVariants({ variant: as === 'p' ? 'default' : undefined, className }))} {...props} />;
}

export { Text, textVariants };
