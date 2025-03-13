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

export { DeleteCategory };
