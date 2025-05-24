import { DeleteCategoryDialog } from '@/features/product-categories/components/categories-table/delete-category-dialog';
import type { ProductCategory } from '@/types/product-category';
import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu';
import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

export const categoriesColumns: ColumnDef<ProductCategory>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return <div>{row.original.name}</div>;
    },
  },
  {
    accessorKey: 'handle',
    header: 'Handle',
    cell: ({ row }) => {
      return <div>{row.original.slug}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return <Badge variant={row.original.status === 'active' ? 'default' : 'outline'}>{row.original.status}</Badge>;
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => {
      const productCategory = row.original;
      const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="size-8">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View category</DropdownMenuItem>
              <DropdownMenuItem>Edit category</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>Delete category</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DeleteCategoryDialog
            categoryId={productCategory.id}
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          />
        </>
      );
    },
  },
];
