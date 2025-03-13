import { ContentSection } from '@/common/components/content-section';
import CategoryForm from '../components/category-form';
import { useCategory } from '../hooks/useCategory';
import { useLocation } from 'react-router';
import { useUpdateCategory } from '../hooks/useUpdateCategory';

import { Button } from '@/common/components/ui/button';
import SubcategoryForm, {
  SubcategoryFormValues,
} from '../components/subcategory-form';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/common/components/ui/dialog';
import { useState } from 'react';
import { CreateSubcategory } from '../interfaces/create-subcategory.interface';
import { useCreateSubcategory } from '../hooks/useCreateSubcategory';
import { UseFormReturn } from 'react-hook-form';
import VerticalSortableCard from '@/common/components/vertical-sortable-card';

export default function EditCategoryPage() {
  const pathname = useLocation().pathname;
  const id = pathname.split('/')[pathname.split('/').length - 1];

  const { data: category, isLoading } = useCategory(+id);
  const { mutateAsync: updateCategory } = useUpdateCategory();

  const { mutateAsync: createSubcategory } = useCreateSubcategory();

  const updateCategoryAction = async (data: FormData) => {
    await updateCategory({ id: +id, category: data });
  };

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const addSubcategoryAction = async (
    data: CreateSubcategory,
    form: UseFormReturn<SubcategoryFormValues>,
  ) => {
    // console.log(data);
    const res = await createSubcategory(data);
    if (res.status == 201) form.reset();
  };
  return (
    <>
      <ContentSection title='ویرایش دسته بندی'>
        <CategoryForm
          initialValue={category}
          formAction={updateCategoryAction}
        />
      </ContentSection>
      <ContentSection title={'زیر دسته ها'}>
        <Dialog
          open={openDialog}
          onOpenChange={setOpenDialog}>
          <DialogTrigger>
            <Button variant={'primary'}>افزودن زیر دسته</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>افزودن زیر دسته</DialogTitle>
            </DialogHeader>

            <SubcategoryForm formAction={addSubcategoryAction}>
              <DialogFooter>
                <DialogClose
                  asChild
                  className='w-1/2'>
                  <Button variant={'secondary'}>انصراف</Button>
                </DialogClose>
                <Button
                  type='submit'
                  variant={'primary'}>
                  افزودن
                </Button>
              </DialogFooter>
            </SubcategoryForm>
          </DialogContent>
        </Dialog>

        {!isLoading &&
          category.subcategories.map((subcategory, index) => {
            return (
              <VerticalSortableCard
                data={category}
                index={index}
                shouldSort={false}
                editLink={`/categories/${category.id}`}
                dialogConfig={{
                  title: 'حذف دسته بندی',
                  description: 'آیا از حذف دسته بندی',
                }}
                // onDelete={() => onDelete(category.id)}
              />
            );
          })}
      </ContentSection>
    </>
  );
}
