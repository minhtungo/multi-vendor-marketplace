import { DeleteProductDialog } from '@/features/product/components/product-table/delete-product-dialog';
import { formatPrice } from '@repo/shared-client/utils';
import type { Order } from '@repo/types/order';
import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu';
import { MoreHorizontal } from '@repo/ui/icons';
import type { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';

export const orderTableColumns: ColumnDef<Order>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => {
      return <div>{row.original.id}</div>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      return <div>{row.original.createdAt.toLocaleString()}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      return (
        <Badge variant={row.original.status !== 'pending' ? 'default' : 'outline'} className="capitalize">
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'total',
    header: 'Total',
    cell: ({ row }) => {
      const amount = parseFloat(row.original.totalAmount.toString());
      return <div className="font-medium">{formatPrice(amount)}</div>;
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
          <DeleteProductDialog
            productId={row.original.id.toString()}
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
          />
        </>
      );
    },
  },
];
