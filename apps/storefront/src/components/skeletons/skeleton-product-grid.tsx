import { SkeletonProductPreview } from '@/components/skeletons/skeleton-product-preview';
import { repeat } from '@/utils/repeat';

type SkeletonProductGridProps = {
  noOfProducts?: number;
};

export function SkeletonProductGrid({ noOfProducts = 8 }: SkeletonProductGridProps) {
  return (
    <ul
      className='grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8 flex-1'
      data-testid='products-list-loader'
    >
      {repeat(noOfProducts).map((index) => (
        <li key={index}>
          <SkeletonProductPreview />
        </li>
      ))}
    </ul>
  );
}
