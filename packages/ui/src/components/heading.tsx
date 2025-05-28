import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@repo/ui/lib/utils';

const headingVariants = cva('font-bitter', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-medium tracking-normal leading-14 lg:text-5xl',
      h2: 'scroll-m-20 text-3xl lg:text-4xl font-medium tracking-normal leading-10',
      h3: 'scroll-m-20 text-2xl font-medium tracking-normal',
      h4: 'scroll-m-20 text-xl font-medium tracking-normal',
      h5: 'text-lg font-medium',
      h6: 'text-base font-medium',
    },
  },
  defaultVariants: {
    variant: 'h2',
  },
});

type HeadingVariantProps = VariantProps<typeof headingVariants>;

type HeadingProps = Omit<React.HTMLAttributes<HTMLHeadingElement>, 'color'> & {
  variant?: HeadingVariantProps['variant'];
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

function Heading({ className, as = 'h2', ...props }: HeadingProps) {
  const Comp = as;
  return <Comp className={cn(headingVariants({ variant: as, className }))} {...props} />;
}

export { Heading, headingVariants };
