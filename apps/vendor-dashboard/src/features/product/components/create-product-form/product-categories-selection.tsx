import { useGetProductCategoriesQuery } from '@/features/product-categories/api/get-product-categories';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/select';
import { cn } from '@repo/ui/lib/utils';

type ProductCategoriesSelectionProps = React.ComponentProps<typeof Select> & { className?: string };

export function ProductCategoriesSelection({ className, ...props }: ProductCategoriesSelectionProps) {
  const { data: categoriesData } = useGetProductCategoriesQuery();

  return (
    <Select {...props}>
      <SelectTrigger className={cn(className)}>
        <SelectValue placeholder="Categories" />
      </SelectTrigger>
      <SelectContent>
        {categoriesData?.map((category) => (
          <SelectItem key={category.id} value={category.id}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
