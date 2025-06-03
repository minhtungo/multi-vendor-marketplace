import { FilterList } from '@/modules/shop/components/filter-bar/filter-list';
import { Button } from '@repo/ui/components/button';
import { Heading } from '@repo/ui/components/heading';
import { cn } from '@repo/ui/lib/utils';

type FilterBarProps = {
  className?: string;
};

export function FilterBar({ className }: FilterBarProps) {
  return (
    <aside className={cn('w-80 shrink-0', className)}>
      <div className='flex items-center justify-between'>
        <Heading level='h2' size='h4'>
          Filters
        </Heading>
        <Button variant='ghost' size='sm' className='-mr-2'>
          Clear all
        </Button>
      </div>
      <FilterList />
    </aside>
  );
}
