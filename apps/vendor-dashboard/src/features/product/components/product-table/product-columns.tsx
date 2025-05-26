import { DeleteProductDialog } from '@/features/product/components/product-table/delete-product-dialog';
import type { ApiResponse } from '@repo/types/api';
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

export const productTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <img
            src={row.original.images?.[0]}
            alt={row.original.name}
            width={100}
            height={100}
            className="size-12 rounded-md object-cover"
          />
          {row.original.name}
        </div>
      );
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => {
      return <div>{row.original.description}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return (
        <Badge variant={row.original.status === 'published' ? 'default' : 'outline'} className="capitalize">
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      const amount = parseFloat(row.original.price.toString());
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const [showDeleteDialog, setShowDeleteDialog] = useState(false);
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
              <DropdownMenuItem>View product</DropdownMenuItem>
              <DropdownMenuItem>Edit product</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>Delete product</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DeleteProductDialog productId={row.original.id} open={showDeleteDialog} onOpenChange={setShowDeleteDialog} />
        </>
      );
    },
  },
];
