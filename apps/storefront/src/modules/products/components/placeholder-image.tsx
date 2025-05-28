import { Image } from '@repo/ui/icons';
import { cn } from '@repo/ui/lib/utils';

type PlaceholderImageProps = React.ComponentProps<'div'>;

export function PlaceholderImage({ className }: PlaceholderImageProps) {
  return (
    <div className={cn('w-full h-full flex items-center justify-center bg-gray-200 rounded-md', className)}>
      <Image />
    </div>
  );
}
