import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@repo/ui/lib/utils';

const textVariants = cva('leading-7', {
  variants: {
    size: {
      small: 'text-sm',
      base: 'text-base',
      large: 'text-lg',
      xlarge: 'text-xl',
    },
    weight: {
      regular: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
    },
    leading: {
      normal: 'leading-7',
      compact: 'leading-5',
    },
  },
  defaultVariants: {
    size: 'base',
    weight: 'regular',
    leading: 'normal',
  },
});

type TextVariantProps = VariantProps<typeof textVariants>;

type TextProps = Omit<React.HTMLAttributes<HTMLParagraphElement>, 'color'> & {
  size?: TextVariantProps['size'];
  weight?: TextVariantProps['weight'];
  leading?: TextVariantProps['leading'];
  as?: 'p' | 'span' | 'div';
};

function Text({ className, as = 'p', size = 'base', weight = 'regular', leading = 'normal', ...props }: TextProps) {
  const Comp = as;

  return <Comp className={cn(textVariants({ size, weight, leading, className }))} {...props} />;
}

export { Text, textVariants };
