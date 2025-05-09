import { Alert, AlertDescription, AlertTitle } from '@repo/ui/components/alert';
import { type VariantProps, cva } from 'class-variance-authority';
import { Info } from 'lucide-react';

const formResponseVariants = cva('', {
  variants: {
    variant: {
      success: '',
      destructive: '',
    },
  },
  defaultVariants: {
    variant: 'success',
  },
});

export interface FormResponseProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formResponseVariants> {
  title: string;
  description: string;
}

const FormResponse = ({ title, description, className, variant, ...props }: FormResponseProps) => {
  return (
    <Alert className={className} {...props}>
      <Info className='size-4' />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export { FormResponse };
