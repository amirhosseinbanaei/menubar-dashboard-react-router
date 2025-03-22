import { PencilIcon } from '@heroicons/react/24/outline';
import { Button } from '@/common/components/ui/button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/common/components/ui/avatar';
import { Skeleton } from '@/common/components/ui/skeleton';
import { Link } from 'react-router';

import { ExtraItem } from '../interfaces/extra-item.interface';
import DeleteDialog from '@/common/components/renderer-dialogs';

interface ExtraItemCardProps<T> {
  data: T;
  editLink: string;
  onDelete: () => void;
}

export default function ExtraItemCard<T extends ExtraItem>({
  data,
  editLink,
  onDelete,
}: ExtraItemCardProps<T>) {
  return (
    <div className='flex w-auto items-center border border-border justify-start gap-x-4 rounded-sm px-4 py-5 md:w-full'>
      <Avatar className={'h-14 w-14 rounded-sm'}>
        <AvatarImage
          className='h-full w-full rounded-sm'
          src={`${data.image}`}
        />
        <AvatarFallback className='h-full w-full rounded-sm'>
          <Skeleton className='h-full w-full rounded-sm' />
        </AvatarFallback>
      </Avatar>

      <div className='w-[calc(100%-144px)] flex h-full flex-col justify-center gap-1'>
        <h1 className='line-clamp-1 font-bold text-text'>
          {data.translations[0].name}
        </h1>
        <p className='line-clamp-1 font-bold text-sm text-text-light'>
          قیمت :{' '}
          {Intl.NumberFormat('fa-IR', {
            useGrouping: true,
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          }).format(data.price)}{' '}
          تومان
        </p>
      </div>
      <div className='flex h-full w-36 items-center justify-center gap-x-3'>
        <Link to={editLink}>
          <Button
            variant={'outline-icon'}
            size={'icon'}>
            <PencilIcon className='h-5 w-5' />
          </Button>
        </Link>

        <Button
          variant={'outline-icon'}
          size={'icon'}>
          <PencilIcon className='h-5 w-5' />
        </Button>

        <DeleteDialog
          title='حذف آیتم اضافی'
          description='آیا از حذف آیتم اضافی اطمینان دارید'
          onDelete={onDelete}
        />
      </div>
    </div>
  );
}
