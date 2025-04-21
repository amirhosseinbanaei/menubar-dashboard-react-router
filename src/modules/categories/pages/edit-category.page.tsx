import { ContentSection } from '@/common/components/content-section';
import CategoryForm, { CategoryFormValues } from '../components/category-form';
import { useCategory } from '../hooks/useCategory';
import { useLocation } from 'react-router';
import { useUpdateCategory } from '../hooks/useUpdateCategory';
import { Button } from '@/common/components/ui/button';
import { useEffect, useState } from 'react';
import { Subcategory } from '../interfaces/subcategory.interface';
import { UseFormReturn } from 'react-hook-form';
import { listingOrders } from '@/common/services/listing-orders.service';
import { useDeleteSubcategory } from '../hooks/useDeleteSubcategory';
import { Category } from '../interfaces/category.interface';
import { useSubcategories } from '../hooks/useSubcategories';
import { Translation } from '@/modules/languages/interfaces/translation.interface';
import { SubcategoryDialog } from '../components/subcategory-dialog';
import { Card, CardDeleteDialog } from '@/common/components/ui';
import { DragDrop } from '@/common/components/drag-drop/drag-drop';
import { useCreateSubcategory } from '../hooks/useCreateSubcategory';

export default function EditCategoryPage() {
  const pathname = useLocation().pathname;
  const id = pathname.split('/')[pathname.split('/').length - 1];

  const { data: category } = useCategory(+id);
  const { mutateAsync: updateCategory } = useUpdateCategory();

  const updateCategoryAction = async (
    data: CategoryFormValues,
    form: UseFormReturn<CategoryFormValues>,
  ) => {
    const formData = new FormData();
    const changedFormKeys = Object.keys(form.formState.dirtyFields);

    formData.append('restaurant_id', '1');
    formData.append('branch_id', '0');

    changedFormKeys.forEach((key) => {
      let listOfInputs: Translation[] = [];

      switch (key) {
        case 'translations':
          form.formState.dirtyFields.translations?.forEach(
            (input, index) =>
              input && listOfInputs.push(data.translations[index]),
          );
          formData.append('translations', JSON.stringify(listOfInputs));
          listOfInputs = [];
          break;
        case 'image':
          formData.append('image', data.image[0]);
          break;
      }
    });
    await updateCategory({ id: +id, category: formData });
  };

  return (
    <>
      <ContentSection title='ویرایش دسته بندی'>
        <CategoryForm
          initialValue={category}
          formAction={updateCategoryAction}
        />
      </ContentSection>
      {category && <SubcategorySection category={category} />}
    </>
  );
}

function SubcategorySection({ category }: { category: Category }) {
  const { data: subcategories } = useSubcategories(category.id);

  const { mutateAsync: deleteSubcategory } = useDeleteSubcategory({
    categoryId: category.id,
  });
  const { mutateAsync: createSubcategory } = useCreateSubcategory({
    categoryId: category.id,
  });
  const [sortableItems, setSortableItems] = useState<Subcategory[]>([]);

  useEffect(() => {
    if (subcategories) {
      const sortedSubcategories = subcategories.sort(
        (a: Subcategory, b: Subcategory) => a.order - b.order,
      );
      setSortableItems(sortedSubcategories);
    }
  }, [subcategories]);

  const handleSort = (newData: Subcategory[]) => {
    const newSortedData = newData.map((subcategory, index) => {
      return { id: subcategory.id, order: index + 1 + category.id };
    });
    listingOrders('subcategories', {
      category_id: category.id,
      orders: newSortedData,
    });
    setSortableItems(newData);
  };

  return (
    <ContentSection title={'زیر دسته ها'}>
      <SubcategoryDialog
        dialogActionType='add'
        title='افزودن زیر دسته'
        dialogAction={async (form) => {
          const newSubcategory = form.getValues();
          const res = await createSubcategory({
            restaurant_id: 1,
            category_id: category.id,
            translations: newSubcategory.translations,
          });
          if (res.status === 201) form.reset();
        }}
        trigger={<Button variant={'primary'}>افزودن زیر دسته</Button>}
      />

      <DragDrop
        items={sortableItems}
        gridColumns={3}
        onChange={(newSortedData) => handleSort(newSortedData)}
        className='gap-5 mt-8'
        direction='grid'
        renderItem={(subcategory, dragHadnle, _, index) => (
          <Card
            index={index + 1}
            dragHandle={dragHadnle}
            dragHandleIcon='arrow'
            title={subcategory.translations[0]?.name}
            key={`subcategory-card:${subcategory.id}`}
            actions={
              <CardDeleteDialog
                title='آیتم'
                description='حذف آیتم'
                onDelete={async () => await deleteSubcategory(subcategory.id)}
              />
            }
          />
        )}
      />
    </ContentSection>
  );
}
