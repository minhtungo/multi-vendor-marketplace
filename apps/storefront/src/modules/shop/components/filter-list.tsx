'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@repo/ui/components/accordion';
import { Button } from '@repo/ui/components/button';
import { Checkbox } from '@repo/ui/components/checkbox';
import { Heading } from '@repo/ui/components/heading';
import { Label } from '@repo/ui/components/label';
import { cn } from '@repo/ui/lib/utils';

type FilterListProps = {
  className?: string;
};

export function FilterList({ className }: FilterListProps) {
  return (
    <aside className={cn('w-80 shrink-0', className)}>
      <div className='flex items-center justify-between'>
        <Heading as='h2' variant='h4'>
          Filters
        </Heading>
        <Button variant='ghost' size='sm' className='-mr-2'>
          Clear all
        </Button>
      </div>
      <Accordion type='multiple'>
        <AccordionItem value='category'>
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent className='space-y-3'>
            <div className='flex items-center space-x-2'>
              <Checkbox id='category' onCheckedChange={(checked) => {}} />
              <Label htmlFor='category' className='text-sm font-normal'>
                Category 1
              </Label>
            </div>
            <div className='flex items-center space-x-2'>
              <Checkbox id='category' onCheckedChange={(checked) => {}} />
              <Label htmlFor='category' className='text-sm font-normal'>
                Category 1
              </Label>
            </div>
            <div className='flex items-center space-x-2'>
              <Checkbox id='category' onCheckedChange={(checked) => {}} />
              <Label htmlFor='category' className='text-sm font-normal'>
                Category 1
              </Label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}
