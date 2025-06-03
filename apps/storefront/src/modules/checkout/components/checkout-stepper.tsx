'use client';

import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@repo/ui/components/stepper';
import { checkoutSteps, CheckoutStepSlug, defaultCheckoutStep } from '@/lib/constants/checkout';
import { cn } from '@repo/ui/lib/utils';
import { useRouter } from 'next/navigation';

type CheckoutStepperProps = {
  step: CheckoutStepSlug;
  className?: string;
};

export function CheckoutStepper({ step, className }: CheckoutStepperProps) {
  const router = useRouter();
  const currentStep = checkoutSteps.find((s) => s.slug === step) ?? defaultCheckoutStep;

  return (
    <Stepper value={currentStep.step} className={cn(className)}>
      {checkoutSteps.map(({ step, title, slug }) => (
        <StepperItem key={step} step={step} className='not-last:flex-1 max-md:items-start'>
          <StepperTrigger className='rounded max-md:flex-col' onClick={() => router.push(`/checkout?step=${slug}`)}>
            <StepperIndicator />
            <div className='text-center md:text-left'>
              <StepperTitle>{title}</StepperTitle>
            </div>
          </StepperTrigger>
          {step < checkoutSteps.length && <StepperSeparator className='max-md:mt-3.5 md:mx-4' />}
        </StepperItem>
      ))}
    </Stepper>
  );
}
