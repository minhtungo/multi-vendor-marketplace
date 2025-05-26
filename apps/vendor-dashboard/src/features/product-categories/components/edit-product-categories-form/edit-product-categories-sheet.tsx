import { EditProductCategoriesForm } from '@/features/product-categories/components/edit-product-categories-form';
import type { ProductCategory } from '@repo/types/product-category';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@repo/ui/components/sheet';

type EditProductCategoriesSheetProps = {
  triggerButton: React.ReactElement;
  productCategory: ProductCategory;
};

export function EditProductCategoriesSheet({ triggerButton, productCategory }: EditProductCategoriesSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{triggerButton}</SheetTrigger>
      <SheetContent className="w-full max-w-[540px]">
        <SheetHeader>
          <SheetTitle>Edit Product</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <EditProductCategoriesForm productCategory={productCategory} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
