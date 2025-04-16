import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/common/components/ui/dialog';
import SubcategoryForm, { SubcategoryFormValues } from './subcategory-form';
import { Button } from '@/common/components/ui/button';
import React, { ReactNode } from 'react';
import { Subcategory } from '../interfaces/subcategory.interface';
import { UseFormReturn } from 'react-hook-form';

interface SubcategoryDialogProps {
  trigger: ReactNode;
  title: string;
  children: ReactNode;
}

function SubcategoryDialog({
  trigger,
  children,
  title,
}: SubcategoryDialogProps) {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
}

interface AddSubcategoryDialogProps {
  trigger: ReactNode;
  onAdd: (
    data: SubcategoryFormValues,
    form: UseFormReturn<SubcategoryFormValues>,
  ) => void;
  addButtonProps?: React.ComponentProps<'button'>;
}

function AddSubcategoryDialog({
  onAdd,
  trigger,
  addButtonProps,
}: AddSubcategoryDialogProps) {
  return (
    <SubcategoryDialog
      title='افزودن زیر دسته'
      trigger={trigger}>
      <SubcategoryForm onSubmit={onAdd}>
        <DialogFooter>
          <DialogClose
            asChild
            className='w-1/2'>
            <Button variant='secondary'>انصراف</Button>
          </DialogClose>
          <Button
            // type='submit'
            type='button'
            variant='primary'
            className='w-1/2'
            {...addButtonProps}>
            افزودن
          </Button>
        </DialogFooter>
      </SubcategoryForm>
    </SubcategoryDialog>
  );
}

interface EditSubcategoryDialogProps {
  trigger: ReactNode;
  initialValue: Subcategory;
  onEdit: () => void;
}

function EditSubcategoryDialog({
  trigger,
  initialValue,
  onEdit,
}: EditSubcategoryDialogProps) {
  return (
    <SubcategoryDialog
      title='ویرایش زیر دسته'
      trigger={trigger}>
      <SubcategoryForm
        initialValue={initialValue}
        onSubmit={onEdit}>
        <DialogFooter>
          <DialogClose
            asChild
            className='w-1/2'>
            <Button variant='secondary'>انصراف</Button>
          </DialogClose>
          <Button
            type='submit'
            variant='primary'
            className='w-1/2'>
            ویرایش
          </Button>
        </DialogFooter>
      </SubcategoryForm>
    </SubcategoryDialog>
  );
}

export { SubcategoryDialog, AddSubcategoryDialog, EditSubcategoryDialog };
