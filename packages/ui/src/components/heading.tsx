import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@repo/ui/lib/utils';

const headingVariants = cva('font-bitter', {
  variants: {
    size: {
      h1: 'scroll-m-20 text-4xl font-medium tracking-normal leading-14 lg:text-5xl',
      h2: 'scroll-m-20 text-3xl lg:text-4xl font-medium tracking-normal leading-10',
      h3: 'scroll-m-20 text-2xl font-medium tracking-normal',
      h4: 'scroll-m-20 text-xl font-medium tracking-normal',
      h5: 'text-lg font-semibold',
      h6: 'text-base font-semibold',
    },
  },
  defaultVariants: {
    size: 'h2',
  },
});

type HeadingVariantProps = VariantProps<typeof headingVariants>;

type HeadingProps = Omit<React.HTMLAttributes<HTMLHeadingElement>, 'color'> & {
  size?: HeadingVariantProps['size'];
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

function Heading({ className, level = 'h2', size = level, ...props }: HeadingProps) {
  const Comp = level;
  return <Comp className={cn(headingVariants({ size, className }))} {...props} />;
}

export { Heading, headingVariants };
