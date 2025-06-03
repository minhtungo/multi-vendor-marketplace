'use client';

import { sortingOptions, SortOptionSlug } from '@/lib/constants/shop';
import { createQueryString } from '@/utils/url';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type SortingSelectionProps = {
  sort: SortOptionSlug;
};

export function SortingSelection({ sort }: SortingSelectionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setQueryParams = (name: string, value: string) => {
    const query = createQueryString(searchParams, { name, value });
    router.push(`${pathname}?${query}`);
  };

  return (
    <Select defaultValue={sort} onValueChange={(value) => setQueryParams('sortBy', value)}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {sortingOptions.map((option) => (
          <SelectItem key={option.slug} value={option.slug}>
            {option.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
