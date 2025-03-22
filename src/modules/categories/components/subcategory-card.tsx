import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

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
import { Button } from '@/common/components/ui/button';
import { Subcategory } from '../interfaces/subcategory.interface';
import { SubcategoryDialog } from './subcategory-dialog';

interface VerticalSortableCardProps<T> {
  data: T;
  index: number;
  dialogConfig: {
    title: string;
    description: string;
  };
  onDelete?: () => void;
}

function SubcategoryCard<T extends Subcategory>({
  data,
  index,
  dialogConfig,
  onDelete,
}: VerticalSortableCardProps<T>) {
  return (
    <div className='flex h-20 w-full items-center justify-start gap-x-4 rounded-sm px-3 shadow-c-xl'>
      <div className='flex h-full w-10 items-center justify-center'>
        <Button
          variant={'default'}
          size={'icon'}
          className='sort-handle hover:cursor-grab'>
          <EllipsisVerticalIcon className='size-6 mb-1' />
        </Button>
        <span>{index + 1}</span>
      </div>

      <div className='w-40 flex h-full items-center'>
        <h1 className='line-clamp-1 font-bold text-text'>
          {data.translations[0].name}
        </h1>
      </div>
      <div className='flex h-full w-28 items-center justify-center gap-x-3'>
        <SubcategoryDialog
          type='edit'
          trigger={
            <Button
              variant={'outline-icon'}
              size={'icon'}>
              <PencilIcon className='h-5 w-5' />
            </Button>
          }
          initialFormValue={data}
          // formAction={async (
          //   data: SubcategoryFormValues,
          //   form: UseFormReturn<SubcategoryFormValues>,
          // ) => {
          //   console.log(data);
          // }}
        />

        <Dialog>
          <DialogTrigger>
            <Button
              variant={'outline'}
              size={'icon'}
              className='border-destructive text-destructive hover:bg-destructive/20'>
              <TrashIcon className='h-5 w-5 text-destructive' />
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>{dialogConfig.title}</DialogTitle>
              <DialogDescription>{dialogConfig.description} </DialogDescription>
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
      </div>
    </div>
  );
}

export { SubcategoryCard };
