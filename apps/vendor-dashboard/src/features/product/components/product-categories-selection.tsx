import { useGetProductCategoriesQuery } from '@/features/product-categories/api/get-product-categories';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/select';

type ProductCategoriesSelectionProps = React.ComponentProps<typeof Select>;

export function ProductCategoriesSelection({ ...props }: ProductCategoriesSelectionProps) {
  const { data: categoriesData } = useGetProductCategoriesQuery();

  return (
    <Select {...props}>
      <SelectTrigger className="w-[180px]">
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
