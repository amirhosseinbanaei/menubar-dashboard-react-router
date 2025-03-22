import { ContentSection } from '@/common/components/content-section';
import { SortableList } from '@/common/components/stj';
import { useEffect, useState } from 'react';
import { Item } from '../interfaces/item.interface';
import { useItems } from '../hooks/useItems';
import { useDeleteItem } from '../hooks/useDeleteItem';
import { Link } from 'react-router';
import { Button } from '@/common/components/ui/button';
import { listingOrders } from '@/common/services/listing-orders.service';
import ItemsCard from '../components/item-cards';
export default function ItemsPage() {
  const { data: items } = useItems();
  const { mutateAsync: deleteItem } = useDeleteItem();
  const [sortableItems, setSortableItems] = useState<Item[]>([]);
  const [shouldSort, setShouldSort] = useState<boolean>(false);
  const [sortEnd, setSortEnd] = useState<boolean>(false);

  useEffect(() => {
    if (items) {
      const sortItemsByOrder = items.sort(
        (a: Item, b: Item) => a.order - b.order,
      );
      setSortableItems(sortItemsByOrder);
    }
  }, [items]);

  const onDelete = async (id: number) => {
    await deleteItem(id);
  };

  useEffect(() => {
    if (sortEnd) {
      const newSortedData = sortableItems.map((item, index) => {
        return { id: item.id, order: index + 1 };
      });
      listingOrders('items', { orders: newSortedData });
      setSortEnd(false);
    }
  }, [sortableItems, sortEnd]);

  // const onSort = async (sortable: Sortable | null, store: Store) => {
  //   console.log(sortable);
  //   console.log(store);
  // };
  return (
    <>
      <ContentSection title={'محصولات'}>
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

        <div className='my-3 h-auto w-full overflow-x-auto rounded-sm bg-transparent shadow-c-xl'>
          <SortableList
            name='items-card'
            items={sortableItems}
            setItems={setSortableItems}
            setSortEnd={setSortEnd}
            className='flex h-auto w-auto flex-shrink-0 flex-col gap-5 bg-transparent md:w-full'
            renderItem={(item, index) => (
              <ItemsCard
                data={item}
                index={index}
                shouldSort={shouldSort}
                editLink={`/items/${item.id}`}
                dialogConfig={{
                  title: 'حذف محصول',
                  description: 'آیا از حذف محصول',
                }}
                onDelete={() => onDelete(item.id)}
              />
            )}
          />
        </div>
      </ContentSection>
    </>
  );
}
