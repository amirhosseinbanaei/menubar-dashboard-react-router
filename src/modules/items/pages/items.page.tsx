import { ContentSection } from '@/common/components/content-section';
import { useEffect, useState } from 'react';
import { Item } from '../interfaces/item.interface';
import { useItems } from '../hooks/useItems';
import { useDeleteItem } from '../hooks/useDeleteItem';
import { Link } from 'react-router';
import { Button } from '@/common/components/ui/button';
import { listingOrders } from '@/common/services/listing-orders.service';
import {
  Card,
  CardDeleteDialog,
  CardIconButton,
} from '@/common/components/ui/reusable-card';
import { DragDrop } from '@/common/components/drag-drop/drag-drop';
import { useCategories } from '@/modules/categories/hooks/useCategories';
import FilterCategoryButton from '../components/filter-category-button';

export default function ItemsPage() {
  const { data: categories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const [shouldSort, setShouldSort] = useState<boolean>(false);

  useEffect(() => {
    if (categories && categories.length > 0 && selectedCategory === null) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories, selectedCategory]);

  if (!selectedCategory) return null;

  return (
    <>
      <ContentSection title={'محصولات'}>
        {/* Categories Section */}
        <div className='w-full flex gap-5 mb-10'>
          {categories &&
            categories.map((category, index) => {
              return (
                <FilterCategoryButton
                  key={`category-card:${index}`}
                  category={category}
                  isSelected={selectedCategory === category.id}
                  onClick={() => setSelectedCategory(category.id)}
                />
              );
            })}
        </div>

        {/* Buttons Section */}
        <span className='mb-6 flex gap-x-5'>
          <Link to={!shouldSort ? '/items/add' : ''}>
            <Button
              disabled={shouldSort}
              variant={'primary'}>
              افزودن محصول
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

        {selectedCategory && (
          <RenderItems
            category_id={selectedCategory}
            shouldSort={shouldSort}
          />
        )}
      </ContentSection>
    </>
  );
}

function RenderItems({
  category_id,
  shouldSort,
}: {
  category_id: number;
  shouldSort: boolean;
}) {
  const { data: items } = useItems(category_id);
  const { mutateAsync: deleteItem } = useDeleteItem();
  const [sortableItems, setSortableItems] = useState<Item[]>([]);

  useEffect(() => {
    if (items) {
      const sortItemsByOrder = items.sort(
        (a: Item, b: Item) => a.order - b.order,
      );
      setSortableItems(sortItemsByOrder);
    }
  }, [items]);

  const handleSort = (newData: Item[]) => {
    const newSortedData = newData.map((item, index) => {
      return { id: item.id, order: index + 1 };
    });
    listingOrders('items', { category_id, orders: newSortedData });
    setSortableItems(newData);
  };
  return (
    <div className='my-3 h-auto w-full overflow-x-auto rounded-sm bg-transparent shadow-c-xl'>
      <DragDrop
        items={sortableItems}
        onChange={(newSortedData) => handleSort(newSortedData)}
        direction='vertical'
        renderItem={(item, dragHadnle, _, index) => (
          <Card
            index={index + 1}
            dragHandle={dragHadnle}
            dragHandleIcon='bars'
            shouldSort={shouldSort}
            key={`item-card-${index}`}
            image={item.image}
            title={item.translations[0].name}
            description={item.translations[0].description}
            descriptionAlign='vertical'
            actions={
              <>
                <Link to={`/items/${item.id}`}>
                  <CardIconButton icon='Pencil' />
                </Link>
                <CardDeleteDialog
                  title='آیتم'
                  description='حذف آیتم'
                  onDelete={async () => await deleteItem(item.id)}
                />
              </>
            }
          />
        )}
      />
    </div>
  );
}
