import {
  EllipsisVerticalIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

import { Link } from 'react-router';

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
import { Subcategory } from '../interfaces/create-subcategory.interface';

interface VerticalSortableCardProps<T> {
  data: T;
  index: number;
  editLink: string;
  dialogConfig: {
    title: string;
    description: string;
  };
  onDelete?: () => void;
}

export default function SubcategoryCard<T extends Subcategory>({
  data,
  index,
  editLink,
  dialogConfig,
  onDelete,
}: VerticalSortableCardProps<T>) {
  return (
    <div className='flex h-20 w-auto items-center justify-start gap-x-4 rounded-sm px-3 shadow-c-xl'>
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
        <Link to={editLink}>
          <Button
            variant={'outline-icon'}
            size={'icon'}>
            <PencilIcon className='h-5 w-5' />
          </Button>
        </Link>

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
              <DialogDescription>
                {dialogConfig.description}{' '}
              </DialogDescription>
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
