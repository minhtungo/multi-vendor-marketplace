import { FEATURES } from '@/lib/constants';
import { cn } from '@repo/ui/lib/utils';

export default function Features() {
  return (
    <section className='py-12'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-8 container'>
        {FEATURES.map((feature) => (
          <div className='flex items-center gap-4'>
            <div className={cn('p-3 rounded-full', feature.bgColor)}>
              <feature.icon className={cn('h-6 w-6', feature.iconColor)} />
            </div>
            <div>
              <h3 className='font-medium'>{feature.title}</h3>
              <p className='text-sm text-muted-foreground'>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
