import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/common/components/ui/dialog';

import {
  CancelDialogButton,
  DeleteDialogButton,
  DeleteDialogTriggerButton,
} from './renderer-buttons';
import { Button } from './ui/button';
import { TrashIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';

function DeleteCategory({ id, title }: { title: string; id: number }) {
  return (
    <Dialog>
      <DialogTrigger>
        <DeleteDialogTriggerButton />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{/* {t('dialog.texts.title')} */}</DialogTitle>
          <DialogDescription>
            {/* {t('dialog.texts.description1')}{' '} */}
            <span className='mx-[1px] font-bold text-destructive'>
              {title}
            </span>{' '}
            {/* {t('dialog.texts.description2')} */}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose
            asChild
            className='w-1/2'>
            <CancelDialogButton />
          </DialogClose>
          <DialogClose
            asChild
            className='w-1/2'>
            <DeleteDialogButton />
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface DeleteDialogProps {
  trigger?: ReactNode;
  title: string;
  description: string;
  onDelete: () => void;
}
export default function DeleteDialog({
  trigger,
  title,
  description,
  onDelete,
}: DeleteDialogProps) {
  return (
    <Dialog>
      <DialogTrigger>
        {trigger || (
          <Button
            variant={'outline'}
            size={'icon'}
            className='border-destructive text-destructive hover:bg-destructive/20'>
            <TrashIcon className='h-5 w-5 text-destructive' />
          </Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {/* <DialogDescription>
            {dialogConfig.description}{' '}
            <span className='mx-[1px] font-bold text-destructive'>
              {data.translations[0].name}
            </span>{' '}
            اطمینان دارید
          </DialogDescription> */}
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

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
              variant={'destructive'}
              onClick={onDelete}>
              حذف
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { DeleteCategory };
