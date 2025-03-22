import { ContentSection } from '@/common/components/content-section';

import { SortableList } from '@/common/components/stj';
import VerticalSortableCard from '@/common/components/vertical-sortable-card';
import { useEffect, useState } from 'react';
import { Category } from '../interfaces/category.interface';
import { useCategories } from '../hooks/useCategories';
import { useDeleteCategory } from '../hooks/useDeleteCategory';
import { Link } from 'react-router';
import { Button } from '@/common/components/ui/button';
import { listingOrders } from '@/common/services/listing-orders.service';

export default function CategoriesPage() {
  const { data: categories } = useCategories();
  const { mutateAsync: deleteCategory } = useDeleteCategory();
  const [sortableItems, setSortableItems] = useState<Category[]>([]);
  const [shouldSort, setShouldSort] = useState<boolean>(false);
  const [sortEnd, setSortEnd] = useState<boolean>(false);

  useEffect(() => {
    if (categories) {
      setSortableItems(categories);
    }
  }, [categories]);

  const onDelete = async (id: number) => {
    await deleteCategory(id);
  };

  useEffect(() => {
    if (sortEnd) {
      const newSortedData = sortableItems.map((item, index) => {
        return { id: item.id, order: index + 1 };
      });
      listingOrders('categories', { orders: newSortedData });
      setSortEnd(false);
    }
  }, [sortableItems, sortEnd]);

  // const onSort = async (sortable: Sortable | null, store: Store) => {
  //   console.log(sortable);
  //   console.log(store);
  // };
  return (
    <>
      <ContentSection title={'دسته بندی ها'}>
        <span className='mb-6 flex gap-x-5'>
          <Link to={!shouldSort ? '/categories/add' : ''}>
            <Button
              disabled={shouldSort}
              variant={'primary'}>
              افزودن دسته بندی
            </Button>
          </Link>

          {!shouldSort ? (
            <Button
              variant={'secondary'}
              onClick={() => setShouldSort(!shouldSort)}>
              ویرایش ترتیب نمایش
            </Button>
          ) : (
            <Button
              variant={'primary'}
              onClick={() => setShouldSort(!shouldSort)}>
              اعمال تغییرات
            </Button>
          )}
        </span>

        <div className='my-8 h-auto w-full overflow-x-auto rounded-sm bg-transparent shadow-c-xl'>
          <SortableList
            name='categories-card'
            items={sortableItems}
            setItems={setSortableItems}
            setSortEnd={setSortEnd}
            className='bg-transparent w-full flex flex-col flex-shrink-0 gap-5'
            renderItem={(category, index) => (
              <VerticalSortableCard
                data={category}
                index={index}
                shouldSort={shouldSort}
                editLink={`/categories/${category.id}`}
                dialogConfig={{
                  title: 'حذف دسته بندی',
                  description: 'آیا از حذف دسته بندی',
                }}
                onDelete={() => onDelete(category.id)}
              />
            )}
          />
        </div>
      </ContentSection>
    </>
  );
}
