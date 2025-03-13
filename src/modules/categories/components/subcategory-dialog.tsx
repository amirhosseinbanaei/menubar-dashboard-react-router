import { Button } from '@/common/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/common/components/ui/dialog';
import { ReactNode } from 'react';

interface SubcategoryDialogProps {
  trigger: ReactNode;
  title: string;
  children: ReactNode;
}
export default function SubcategoryDialog({
  trigger,
  title,
  children,
}: SubcategoryDialogProps) {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
        <DialogFooter>
          <DialogClose
            asChild
            className='w-1/2'>
            <Button variant={'secondary'}>انصراف</Button>
          </DialogClose>
          <DialogClose
            asChild
            className='w-1/2'>
            <Button
              variant={'primary'}
              //   onClick={onDelete}
            >
              افزودن
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
