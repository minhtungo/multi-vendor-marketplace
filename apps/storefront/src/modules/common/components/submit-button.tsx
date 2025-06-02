'use client';

import { LoaderButton } from '@repo/ui/components/loader-button';
import { useFormStatus } from 'react-dom';

interface SubmitButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export function SubmitButton({ children, className, disabled }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <LoaderButton className={className} type='submit' isPending={pending} disabled={disabled || pending}>
      {children}
    </LoaderButton>
  );
}
