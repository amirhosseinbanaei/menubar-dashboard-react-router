import { ContentSection } from '@/common/components/content-section';
import CategoryForm, { CategoryFormValues } from '../components/category-form';
import { useCategory } from '../hooks/useCategory';
import { useLocation } from 'react-router';
import { useUpdateCategory } from '../hooks/useUpdateCategory';
import { Button } from '@/common/components/ui/button';
import { useEffect, useState } from 'react';
import { Subcategory } from '../interfaces/subcategory.interface';
import { UseFormReturn } from 'react-hook-form';
import { SubcategoryCard } from '../components/subcategory-card';
import { SortableList } from '@/common/components/stj';
import { listingOrders } from '@/common/services/listing-orders.service';
import { useDeleteSubcategory } from '../hooks/useDeleteSubcategory';
import { Category } from '../interfaces/category.interface';
import { useSubcategories } from '../hooks/useSubcategories';
import { Translation } from '@/modules/languages/interfaces/translation.interface';
import { SubcategoryDialog } from '../components/subcategory-dialog';

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
  const [sortableItems, setSortableItems] = useState<Subcategory[]>([]);
  const [sortEnd, setSortEnd] = useState<boolean>(false);

  useEffect(() => {
    if (subcategories) {
      const sortedSubcategories = subcategories.sort(
        (a: Subcategory, b: Subcategory) => a.order - b.order,
      );
      setSortableItems(sortedSubcategories);
    }
  }, [subcategories]);

  useEffect(() => {
    if (sortEnd) {
      const newSortedData = sortableItems.map((item, index) => {
        return { id: item.id, order: index + 1 };
      });
      listingOrders('subcategories', {
        category_id: category.id,
        orders: newSortedData,
      });
      setSortEnd(false);
    }
  }, [sortableItems, sortEnd]);

  return (
    <ContentSection title={'زیر دسته ها'}>
      <SubcategoryDialog
        type='add'
        trigger={<Button variant={'primary'}>افزودن زیر دسته</Button>}
      />

      <SortableList
        name='subcategories-card'
        items={sortableItems}
        setItems={setSortableItems}
        setSortEnd={setSortEnd}
        className='my-5 flex flex-col flex-shrink-0 gap-5'
        renderItem={(subcategory, index) => (
          <SubcategoryCard
            data={subcategory}
            index={index}
            key={`subcategory-${subcategory.id}`}
            dialogConfig={{
              title: 'حذف زیر دسته',
              description: 'آیا از حذف زیر دسته مطمئن هستید؟',
            }}
            onDelete={async () => await deleteSubcategory(subcategory.id)}
          />
        )}
      />
    </ContentSection>
  );
}
