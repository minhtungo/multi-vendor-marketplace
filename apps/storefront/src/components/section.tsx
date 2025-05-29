import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@repo/ui/lib/utils';
import { Heading } from '@repo/ui/components/heading';
import { Text } from '@repo/ui/components/text';

const sectionVariants = cva('w-full', {
  variants: {
    variant: {
      default: 'bg-background',
      muted: 'bg-muted',
      secondary: 'bg-secondary',
      accent: 'bg-accent',
    },
    size: {
      default: 'py-16 md:py-24',
      sm: 'py-8 md:py-12',
      lg: 'py-20 md:py-32',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

type SectionVariantProps = VariantProps<typeof sectionVariants>;

type SectionProps = React.ComponentProps<'section'> & {
  variant?: SectionVariantProps['variant'];
  size?: SectionVariantProps['size'];
  as?: 'section' | 'div';
};

function Section({ className, variant, size, as = 'section', children, ...props }: SectionProps) {
  return (
    <section className={cn('relative', sectionVariants({ variant, size, className }))} {...props}>
      {children}
    </section>
  );
}

function SectionHeader({ className, children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('text-center mb-12 container', className)} {...props}>
      {children}
    </div>
  );
}

function SectionTitle({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <Heading as='h2' className={cn('mb-6', className)} {...props}>
      {children}
    </Heading>
  );
}

function SectionSubTitle({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <Text
      as='span'
      className={cn('text-sm font-semibold capitalize text-primary mb-2 inline-block', className)}
      {...props}
    >
      {children}
    </Text>
  );
}

function SectionDescription({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <Text className={cn('text-balance max-w-3xl mx-auto', className)} {...props}>
      {children}
    </Text>
  );
}

function SectionContent({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className={cn('relative container', className)} {...props}>
      {children}
    </div>
  );
}

export { Section, SectionHeader, SectionTitle, SectionSubTitle, SectionDescription, SectionContent };
