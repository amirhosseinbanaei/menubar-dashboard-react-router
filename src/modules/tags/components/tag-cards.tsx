import { PencilIcon } from '@heroicons/react/24/outline';
import { Button } from '@/common/components/ui/button';
import { Link } from 'react-router';

import { Tag } from '../interfaces/tag.interface';
import DeleteDialog from '@/common/components/renderer-dialogs';
import { Avatar, AvatarFallback, AvatarImage } from '@/common/components/ui/avatar';
import { Skeleton } from '@/common/components/ui/skeleton';

interface TagCardProps<T> {
  data: T;
  editLink: string;
  onDelete: () => void;
}

export default function TagCard<T extends Tag>({
  data,
  editLink,
  onDelete,
}: TagCardProps<T>) {
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
      <div className='w-[calc(100%-112px)] flex h-full flex-col justify-center gap-1'>
        <h1 className='line-clamp-1 font-bold text-text'>
          {data.translations[0].name}
        </h1>
        <p className='line-clamp-1 font-bold text-sm text-text-light'>
          {/* {data.items.length} آیتم */}
          {data.translations[0].description}
        </p>
      </div>
      <div className='flex h-full w-24 items-center justify-center gap-x-3'>
        <Link to={editLink}>
          <Button
            variant={'outline-icon'}
            size={'icon'}>
            <PencilIcon className='h-5 w-5' />
          </Button>
        </Link>

        <DeleteDialog
          title='حذف تگ'
          description='آیا از حذف تگ اطمینان دارید'
          onDelete={onDelete}
        />
      </div>
    </div>
  );
} 