import { ReactNode } from 'react';

// Icons :
import {
  ArrowsPointingOutIcon,
  Bars2Icon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

// Components:
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';
import { Button, buttonVariants } from './button';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Skeleton } from './skeleton';
import { cn } from '@/common/lib/utils';
import { VariantProps } from 'class-variance-authority';

interface CardDragHandleProps {
  'data-drag-handle': boolean;
  'aria-label': string;
  tabIndex: number;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onMouseDown: (e: React.MouseEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
}

interface CardProps {
  title: string;
  index?: number;
  image?: string;
  className?: string;
  actions?: ReactNode;
  shouldSort?: boolean;
  description?: string | ReactNode;
  descriptionAlign?: 'vertical' | 'horizontal';
  dragHandle?: CardDragHandleProps;
  dragHandleIcon?: 'arrow' | 'bars';
}

export function Card({
  index,
  title,
  image,
  actions,
  className,
  description,
  shouldSort,
  descriptionAlign = 'horizontal',
  dragHandle,
  dragHandleIcon = 'bars',
}: CardProps) {
  return (
    <div
      className={`flex h-20 w-auto items-center justify-start gap-x-4 rounded-sm px-5 shadow-c-xl md:w-full ${className}`}>
      {/* Drag Icon While Should Sort Undefiend */}
      {shouldSort === undefined && dragHandle && (
        <CardDragHandleButton
          dragHandle={dragHandle}
          dragHandleIcon={dragHandleIcon}
        />
      )}

      {/* Card Index While Should Sort Undefiend */}
      {shouldSort === undefined && index && (
        <div className='flex h-full w-10 items-center justify-center'>
          {index}
        </div>
      )}

      {/* Index or Sort Handle */}
      {shouldSort !== undefined && index && dragHandle && (
        <div className='flex h-full w-10 items-center justify-center'>
          {shouldSort === false ? (
            index
          ) : (
            <CardDragHandleButton
              dragHandle={dragHandle}
              dragHandleIcon={dragHandleIcon}
            />
          )}
        </div>
      )}
      {/* Image */}
      {image && (
        <Avatar className={'h-14 w-14 rounded-sm'}>
          <AvatarImage
            className='h-full w-full rounded-sm'
            src={image}
          />
          <AvatarFallback className='h-full w-full rounded-sm'>
            <Skeleton className='h-full w-full rounded-sm' />
          </AvatarFallback>
        </Avatar>
      )}
      {/* Content */}
      <div
        className={cn('flex h-full', {
          'w-full flex-col justify-center': descriptionAlign === 'vertical',
          'items-center w-40': descriptionAlign === 'horizontal',
        })}>
        <h1 className='line-clamp-1 font-bold text-text'>{title}</h1>
        {descriptionAlign === 'vertical' &&
          (typeof description === 'string' ? (
            <p className='line-clamp-1 text-text-light'>{description}</p>
          ) : (
            description
          ))}
      </div>
      {/* Spacer */}
      <div
        className={cn('hidden h-full', {
          'w-0 hidden': descriptionAlign === 'vertical',
          'w-[calc(100%-272px)] md:flex items-center':
            descriptionAlign === 'horizontal',
        })}>
        {typeof description === 'string' ? (
          <p className='line-clamp-1 text-text-light'>{description}</p>
        ) : (
          description
        )}
      </div>
      {/* Actions */}
      <div className='flex h-full w-fit items-center justify-center gap-x-3'>
        {actions}
      </div>
    </div>
  );
}

export function CardIconButton({
  icon,
  size = 'icon',
  variant = 'outline',
  type = 'button',
  className,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    icon: 'Trash' | 'XMark' | 'Plus' | 'Pencil';
  }) {
  return (
    <Button
      className={cn(buttonVariants({ variant, size, className }), {
        'border-destructive text-destructive hover:bg-destructive/20':
          icon === 'Trash',
        'border-text-light': icon === 'XMark',
        'border-primary border text-primary hover:bg-primary/20':
          icon === 'Plus' || icon === 'Pencil',
      })}
      type={type}
      {...props}>
      {icon === 'Trash' && <TrashIcon className='h-5 w-5 text-destructive' />}
      {icon === 'XMark' && <XMarkIcon className='h-5 w-5 text-text-light' />}
      {icon === 'Plus' && <PlusIcon className='h-5 w-5 text-primary' />}
      {icon === 'Pencil' && <PencilIcon className='h-5 w-5 text-primary' />}
    </Button>
  );
}

export function CardDragHandleButton({
  dragHandle,
  dragHandleIcon,
}: {
  dragHandle: CardDragHandleProps;
  dragHandleIcon: 'arrow' | 'bars';
}) {
  return (
    <div className='flex h-full w-10 items-center justify-center'>
      {dragHandleIcon === 'bars' ? (
        <Button
          variant={'outline-icon'}
          size={'icon'}
          {...dragHandle}
          type='button'
          className='sort-handle hover:bg-transparent'>
          <Bars2Icon className='h-5 w-5' />
        </Button>
      ) : (
        <Button
          variant={'default'}
          size={'icon'}
          {...dragHandle}
          type='button'
          className='flex items-center hover:bg-transparent'>
          <ArrowsPointingOutIcon className='h-5 w-5' />
        </Button>
      )}
    </div>
  );
}

export function CardDeleteDialog({
  title,
  onDelete,
  description,
}: {
  title: string;
  description: string;
  onDelete: () => void;
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <CardIconButton icon='Trash' />
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
