import { cn } from '@repo/ui/lib/utils';

type FormItemProps = React.ComponentProps<'div'>;

export function FormItem({ className, ...props }: FormItemProps) {
  return <div className={cn('grid gap-3', className)} {...props} />;
}
