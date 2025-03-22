import { Link } from 'react-router';
import { Button } from '@/common/components/ui/button';
import { useExtraItems } from '../hooks/useExtraItems';
import ExtraItemCard from '../components/extra-item-cards';
import { ContentSection } from '@/common/components/content-section';
import { useDeleteExtraItem } from '../hooks/useDeleteExtraItem';

export default function ExtraItemsPage() {
  const { data: extraItems, isLoading } = useExtraItems();
  const { mutateAsync: deleteExtraItem } = useDeleteExtraItem();

  return (
    <>
      {isLoading ? (
        <h1>amir</h1>
      ) : (
        <ContentSection title={'آیتم های اضافی'}>
          <Link to={'/extra-items/add'}>
            <Button variant={'primary'}>افزودن آیتم اضافی</Button>
          </Link>

          <div className='my-8 h-auto w-full overflow-x-auto rounded-sm bg-transparent  grid grid-cols-1 lg:grid-cols-2 gap-5'>
            {extraItems.map((extraItem, index) => {
              return (
                <ExtraItemCard
                  key={`extra-item-card-${index}`}
                  data={extraItem}
                  editLink={`/extra-items/${extraItem.id}`}
                  onDelete={() => deleteExtraItem(extraItem.id)}
                />
              );
            })}
          </div>
        </ContentSection>
      )}
    </>
  );
}
