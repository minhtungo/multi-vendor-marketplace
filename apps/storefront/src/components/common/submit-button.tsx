'use client';

import { LoaderButton } from '@repo/ui/components/loader-button';
import { useFormStatus } from 'react-dom';

export function SubmitButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const { pending } = useFormStatus();

  return (
    <LoaderButton className={className} type='submit' isPending={pending}>
      {children}
    </LoaderButton>
  );
}
