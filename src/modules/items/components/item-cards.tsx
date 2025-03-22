import { Bars2Icon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@/common/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/common/components/ui/avatar';
import { Skeleton } from '@/common/components/ui/skeleton';
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
import { Item } from '../interfaces/item.interface';

interface ItemsCardProps<T> {
  data: T;
  index: number;
  shouldSort: boolean;
  editLink: string;
  dialogConfig: {
    title: string;
    description: string;
  };
  onDelete?: () => void;
}

export default function ItemsCard<T extends Item>({
  data,
  index,
  shouldSort,
  editLink,
  dialogConfig,
  onDelete,
}: ItemsCardProps<T>) {
  return (
    <div className='flex h-20 w-auto items-center justify-start gap-x-4 rounded-sm px-3 shadow-c-xl md:w-full'>
      <div className='flex h-full w-10 items-center justify-center'>
        {!shouldSort ? (
          index + 1
        ) : (
          <Button
            variant={'outline-icon'}
            size={'icon'}
            className='sort-handle hover:bg-transparent'>
            <Bars2Icon className='h-5 w-5' />
          </Button>
        )}
      </div>

      <Avatar className={'h-14 w-14 rounded-sm'}>
        <AvatarImage
          className='h-full w-full rounded-sm'
          src={`${data.image}`}
        />
        <AvatarFallback className='h-full w-full rounded-sm'>
          <Skeleton className='h-full w-full rounded-sm' />
        </AvatarFallback>
      </Avatar>

      <div className='w-40 flex h-full items-center'>
        <h1 className='line-clamp-1 font-bold text-text'>
          {data.translations[0].name}
        </h1>
      </div>
      <div className='hidden w-[calc(100%-272px)] md:block'></div>
      <div className='flex h-full w-28 items-center justify-center gap-x-3'>
        {!shouldSort && (
          <>
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
                    <span className='mx-[1px] font-bold text-destructive'>
                      {data.translations[0].name}
                    </span>{' '}
                    اطمینان دارید
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
          </>
        )}
      </div>
    </div>
  );
}
