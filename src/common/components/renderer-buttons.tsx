import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button } from './ui/button';
import { Link } from 'react-router';
import { cn } from '../lib/utils';

function AddButton({
  href,
  title,
  className,
}: {
  href: string;
  title: string;
  className?: string;
}) {
  return (
    <Link to={href}>
      <Button
        variant={'primary'}
        className={className}>
        {title}
      </Button>
    </Link>
  );
}

function ChangeOrderButton({ onClick,className }: { className?: string }) {
  return (
    <Button
      variant={'secondary'}
      className={className}>
      ویرایش ترتیب نمایش
    </Button>
  );
}

function EditCardButton({ href }: { href: string }) {
  return (
    <Link to={href}>
      <Button
        variant={'outline-icon'}
        size={'icon'}>
        <PencilIcon className='h-5 w-5' />
      </Button>
    </Link>
  );
}

function CancelDialogButton({ className }: { className?: string }) {
  return (
    <Button
      variant={'secondary'}
      className={className}>
      انصراف
    </Button>
  );
}

function DeleteDialogButton({ className }: { className?: string }) {
  return (
    <Button
      variant={'destructive'}
      className={className}>
      حذف
    </Button>
  );
}

function DeleteDialogTriggerButton({ className }: { className?: string }) {
  return (
    <Button
      variant={'outline'}
      size={'icon'}
      className={cn(
        'border-destructive text-destructive hover:bg-destructive/20',
        className,
      )}>
      <TrashIcon className='h-5 w-5' />
    </Button>
  );
}

export {
  AddButton,
  ChangeOrderButton,
  EditCardButton,
  CancelDialogButton,
  DeleteDialogButton,
  DeleteDialogTriggerButton
};
