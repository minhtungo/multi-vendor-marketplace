import { PAYMENT_METHODS } from '@/lib/constants/payment';
import { cn } from '@repo/ui/lib/utils';
import Image from 'next/image';

type AcceptedPaymentMethodsProps = React.ComponentProps<'div'>;

export function AcceptedPaymentMethods({ className }: AcceptedPaymentMethodsProps) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      {PAYMENT_METHODS.map((method) => (
        <Image
          key={`payment-method-${method.name}`}
          src={method.icon}
          alt={method.name}
          width={32}
          height={32}
          className='size-9'
        />
      ))}
    </div>
  );
}
