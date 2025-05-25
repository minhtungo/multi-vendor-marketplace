import { DrawerDialog } from '@/components/drawer-dialog';
import { useDeleteProduct } from '@/features/product/api/delete-product';
import type { Dialog } from '@repo/ui/components/dialog';
import type { Drawer } from '@repo/ui/components/drawer';
import { LoaderButton } from '@repo/ui/components/loader-button';

type DeleteProductDialogProps = React.ComponentProps<typeof Dialog | typeof Drawer> & {
  triggerButton?: React.ReactElement;
  productId: string;
};

export function DeleteProductDialog({
  triggerButton,
  productId,
  open,
  onOpenChange,
  ...props
}: DeleteProductDialogProps) {
  const { mutate: deleteProduct, isPending } = useDeleteProduct();

  const handleDelete = () => {
    deleteProduct(
      { id: productId },
      {
        onSuccess: () => {
          onOpenChange?.(false);
        },
      },
    );
  };

  return (
    <DrawerDialog
      title="Delete Product"
      description="Are you sure you want to delete this product?"
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
