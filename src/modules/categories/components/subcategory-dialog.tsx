import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/common/components/ui/dialog';
import SubcategoryForm from './subcategory-form';
import { Button } from '@/common/components/ui/button';
import { Subcategory } from '../interfaces/subcategory.interface';

interface SubcategoryDialogProps {
  trigger: React.ReactNode;
  initialFormValue?: Subcategory;
  type: 'add' | 'edit' | 'add-in-category';
}

function SubcategoryDialog({
  type,
  trigger,
  initialFormValue,
}: SubcategoryDialogProps) {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === 'edit' ? 'ویرایش زیر دسته' : 'افزودن زیر دسته'}
          </DialogTitle>
        </DialogHeader>

        <SubcategoryForm initialValue={initialFormValue}>
          <DialogFooter>
            <DialogClose
              asChild
              className='w-1/2'>
              <Button variant={'secondary'}>انصراف</Button>
            </DialogClose>
            <Button
              type='submit'
              variant={'primary'}
              className='w-1/2'>
              {type === 'edit' ? 'ویرایش' : 'افزودن'}
            </Button>
          </DialogFooter>
        </SubcategoryForm>
      </DialogContent>
    </Dialog>
  );
}

export { SubcategoryDialog };
