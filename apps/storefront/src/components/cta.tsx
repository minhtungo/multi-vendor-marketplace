import { RotateCcw, Shield, Truck } from '@repo/ui/icons';

type CtaProps = React.ComponentProps<'div'>;

export function Cta({}: CtaProps) {
  return (
    <div className='grid grid-cols-3 gap-4 pt-6 border-t'>
      <div className='flex flex-col items-center text-center'>
        <Truck className='w-6 h-6 mb-2 text-primary' />
        <span className='text-sm font-medium'>Free Shipping</span>
        <span className='text-xs text-muted-foreground'>Orders over $50</span>
      </div>
      <div className='flex flex-col items-center text-center'>
        <Shield className='w-6 h-6 mb-2 text-primary' />
        <span className='text-sm font-medium'>2 Year Warranty</span>
        <span className='text-xs text-muted-foreground'>Full coverage</span>
      </div>
      <div className='flex flex-col items-center text-center'>
        <RotateCcw className='w-6 h-6 mb-2 text-primary' />
        <span className='text-sm font-medium'>30-Day Returns</span>
        <span className='text-xs text-muted-foreground'>No questions asked</span>
      </div>
    </div>
  );
}
