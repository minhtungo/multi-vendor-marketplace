import { DrawerDialog } from '@/components/drawer-dialog';
import { useDeleteProductCategory } from '@/features/product-categories/api/delete-product-category';
import type { Dialog } from '@repo/ui/components/dialog';
import type { Drawer } from '@repo/ui/components/drawer';
import { LoaderButton } from '@repo/ui/components/loader-button';

type DeleteCategoryDialogProps = React.ComponentProps<typeof Dialog | typeof Drawer> & {
  triggerButton?: React.ReactElement;
  categoryId: string;
};

export function DeleteCategoryDialog({
  triggerButton,
  categoryId,
  open,
  onOpenChange,
  ...props
}: DeleteCategoryDialogProps) {
  const { mutate: deleteProductCategory, isPending } = useDeleteProductCategory();

  const handleDelete = () => {
    deleteProductCategory(
      { id: categoryId },
      {
        onSuccess: () => {
          onOpenChange?.(false);
        },
      },
    );
  };

  return (
    <DrawerDialog
      title="Delete Category"
      description="Are you sure you want to delete this category?"
      triggerButton={triggerButton}
      open={open}
      onOpenChange={onOpenChange}
      submitButton={
        <LoaderButton onClick={handleDelete} isPending={isPending}>
          Delete
        </LoaderButton>
      }
      {...props}
    />
  );
}
