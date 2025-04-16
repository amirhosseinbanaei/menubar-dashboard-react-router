import { Link } from 'react-router';
import { Button } from '@/common/components/ui/button';
import { useExtraItems } from '../hooks/useExtraItems';
import { ContentSection } from '@/common/components/content-section';
import { useDeleteExtraItem } from '../hooks/useDeleteExtraItem';
import { Card, CardIconButton } from '@/common/components/ui/reusable-card';

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

          <div className='my-8 h-auto w-full overflow-x-auto rounded-sm bg-transparent shadow-c-xl  grid grid-cols-1 lg:grid-cols-2 gap-5'>
            {extraItems.map((extraItem, index) => {
              return (
                <Card
                  key={`extra-item-card-${index}`}
                  image={extraItem.image}
                  title={extraItem.translations[0].name}
                  description={
                    <p className='text-text-light'>
                      قیمت :{' '}
                      {Intl.NumberFormat('fa-IR', {
                        useGrouping: true,
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      }).format(extraItem.price)}{' '}
                      تومان
                    </p>
                  }
                  descriptionAlign='vertical'
                  actions={
                    <>
                      <Link to={`/extra-items/${extraItem.id}`}>
                        <CardIconButton icon='Pencil' />
                      </Link>
                      <CardIconButton
                        icon='Trash'
                        onClick={async () =>
                          await deleteExtraItem(extraItem.id)
                        }
                      />
                    </>
                  }
                />
              );
            })}
          </div>
        </ContentSection>
      )}
    </>
  );
}
