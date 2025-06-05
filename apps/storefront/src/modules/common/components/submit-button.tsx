'use client';

import { buttonVariants } from '@repo/ui/components/button';
import { LoaderButton } from '@repo/ui/components/loader-button';
import { Spinner } from '@repo/ui/components/spinner';
import { VariantProps } from 'class-variance-authority';
import { useFormStatus } from 'react-dom';

interface SubmitButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  variant?: VariantProps<typeof buttonVariants>['variant'];
  size?: VariantProps<typeof buttonVariants>['size'];
}

export function SubmitButton({ children, className, disabled, variant, size }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  console.log('pending', pending);

  return (
    <LoaderButton
      className={className}
      type='submit'
      isPending={pending}
      disabled={disabled}
      variant={variant}
      size={size}
    >
      {children}
    </LoaderButton>
  );
}
