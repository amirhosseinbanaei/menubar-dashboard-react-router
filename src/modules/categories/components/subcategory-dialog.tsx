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
import { ReactNode } from 'react';
import { Button } from '@/common/components/ui/button';
import { useFormContext, UseFormReturn } from 'react-hook-form';
import { AddToFormButton } from '@/common/components/form-buttons';

interface SubcategoryDialogProps {
  trigger: ReactNode;
  title: string;
  dialogAction: (subCategoryForm: UseFormReturn<SubcategoryFormValues>) => void;
  dialogActionType: 'add' | 'edit' | 'add-in-form';
}

export function SubcategoryDialog({
  trigger,
  title,
  dialogAction,
  dialogActionType,
}: SubcategoryDialogProps) {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <SubcategoryForm>
          <DialogFooter>
            <SubcategoryDialogButtons
              dialogAction={dialogAction}
              dialogActionType={dialogActionType}
            />
          </DialogFooter>
        </SubcategoryForm>
      </DialogContent>
    </Dialog>
  );
}

function SubcategoryDialogButtons({
  dialogAction,
  dialogActionType,
}: {
  dialogAction: (subCategoryForm: UseFormReturn<SubcategoryFormValues>) => void;
  dialogActionType: 'add' | 'edit' | 'add-in-form';
}) {
  const subCategoryForm = useFormContext<SubcategoryFormValues>();
  return (
    <>
      <DialogClose
        asChild
        className='w-1/2'>
        <Button variant='secondary'>انصراف</Button>
      </DialogClose>
      <AddToFormButton
        type={'button'}
        form={subCategoryForm}
        className='w-1/2'
        buttonAction={() => dialogAction(subCategoryForm)}
      />
    </>
  );
}

// interface SubcategoryDialogProps {
//   trigger: ReactNode;
//   title: string;
//   children: ReactNode;
// }

// function SubcategoryDialog({
//   trigger,
//   children,
//   title,
// }: SubcategoryDialogProps) {
//   return (
//     <Dialog>
//       <DialogTrigger>{trigger}</DialogTrigger>

//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>{title}</DialogTitle>
//         </DialogHeader>

//         {children}
//       </DialogContent>
//     </Dialog>
//   );
// }

// interface AddSubcategoryDialogProps {
//   trigger: ReactNode;
//   dialogAddButton: ReactNode;
// }

// function AddSubcategoryDialog({
//   trigger,
//   dialogAddButton,
// }: AddSubcategoryDialogProps) {
//   return (
//     <SubcategoryDialog
//       title='افزودن زیر دسته'
//       trigger={trigger}>
//       <SubcategoryForm>
//         <DialogFooter>
//           {/* <DialogClose
//             asChild
//             className='w-1/2'>
//             <Button variant='secondary'>انصراف</Button>
//           </DialogClose> */}
//           {/* {dialogAddButton} */}
//           <SubcategoryDialogButtons />
//           {/* <Button
//             // type='submit'
//             type='button'
//             variant='primary'
//             className='w-1/2'
//             {...addButtonProps}>
//             افزودن
//           </Button> */}
//         </DialogFooter>
//       </SubcategoryForm>
//     </SubcategoryDialog>
//   );
// }

// interface EditSubcategoryDialogProps {
//   trigger: ReactNode;
//   initialValue: Subcategory;
// }

// function EditSubcategoryDialog({
//   trigger,
//   initialValue,
// }: EditSubcategoryDialogProps) {
//   return (
//     <SubcategoryDialog
//       title='ویرایش زیر دسته'
//       trigger={trigger}>
//       <SubcategoryForm initialValue={initialValue}>
//         <DialogFooter>
//           <DialogClose
//             asChild
//             className='w-1/2'>
//             <Button variant='secondary'>انصراف</Button>
//           </DialogClose>
//           {/* <Button
//             type='submit'
//             variant='primary'
//             className='w-1/2'>
//             ویرایش
//           </Button> */}
//         </DialogFooter>
//       </SubcategoryForm>
//     </SubcategoryDialog>
//   );
// }

// export { SubcategoryDialog, AddSubcategoryDialog, EditSubcategoryDialog };
