'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@repo/ui/components/accordion';
import { Checkbox } from '@repo/ui/components/checkbox';
import { Label } from '@repo/ui/components/label';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type FilterListProps = {
  className?: string;
};

const categories = [
  {
    id: 'category-1',
    name: 'Category 1',
    slug: 'category-1',
  },
  {
    id: 'category-2',
    name: 'Category 2',
    slug: 'category-2',
  },
  {
    id: 'category-3',
    name: 'Category 3',
    slug: 'category-3',
  },
];

export function FilterList({ className }: FilterListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedCategories = searchParams.get('category')?.split(',').filter(Boolean) || [];

  const handleCategoryChange = (checked: boolean, slug: string) => {
    const params = new URLSearchParams(searchParams);
    const currentCategories = new Set(selectedCategories);

    if (checked) {
      currentCategories.add(slug);
    } else {
      currentCategories.delete(slug);
    }

    if (currentCategories.size > 0) {
      params.set('category', Array.from(currentCategories).join(','));
    } else {
      params.delete('category');
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Accordion type='multiple' defaultValue={['category']}>
      <AccordionItem value='category'>
        <AccordionTrigger>Category</AccordionTrigger>
        <AccordionContent className='space-y-3'>
          {categories.map((category) => (
            <div className='flex items-center space-x-2' key={category.id}>
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.slug)}
                onCheckedChange={(checked) => handleCategoryChange(checked as boolean, category.slug)}
              />
              <Label htmlFor={category.id} className='text-sm font-normal'>
                {category.name}
              </Label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
