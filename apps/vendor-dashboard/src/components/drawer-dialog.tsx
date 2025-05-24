import { useIsMobile } from '@/hooks/use-is-mobile';
import { Button } from '@repo/ui/components/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/components/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@repo/ui/components/drawer';
import * as React from 'react';

type DrawerDialogProps = React.ComponentProps<typeof Dialog | typeof Drawer> & {
  title: string;
  description: string;
  triggerButton?: React.ReactElement;
  submitButton: React.ReactElement;
  body?: React.ReactElement;
  cancelButtonText?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function DrawerDialog({
  title,
  description,
  triggerButton,
  body,
  submitButton,
  cancelButtonText = 'Cancel',
  open,
  onOpenChange,
  ...props
}: DrawerDialogProps) {
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange} {...props}>
        {triggerButton && <DialogTrigger asChild>{triggerButton}</DialogTrigger>}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {body}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">{cancelButtonText || 'Cancel'}</Button>
            </DialogClose>
            {submitButton}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} {...props}>
      {triggerButton && <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>}
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        {body}
        <DrawerFooter>
          {submitButton}
          <DrawerClose asChild>
            <Button variant="outline">{cancelButtonText || 'Cancel'}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
