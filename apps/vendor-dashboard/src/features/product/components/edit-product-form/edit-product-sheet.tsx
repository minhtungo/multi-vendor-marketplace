import { EditProductForm } from '@/features/product/components/edit-product-form';
import type { Product } from '@repo/types/product';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@repo/ui/components/sheet';

type UpdateProductSheetProps = {
  triggerButton: React.ReactElement;
  product: Product;
};

export function UpdateProductSheet({ triggerButton, product }: UpdateProductSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{triggerButton}</SheetTrigger>
      <SheetContent className="w-full max-w-[540px]">
        <SheetHeader>
          <SheetTitle>Edit Product</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <EditProductForm product={product} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
