import { cn } from '@/common/lib/utils';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/common/components/ui/dialog';
import { Button } from '@/common/components/ui/button';
import { Card, CardIconButton } from '@/common/components/ui/reusable-card';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { ItemFormValues } from './item-form';
import { ExtraItem } from '@/modules/extra-items/interfaces/extra-item.interface';
import { useExtraItems } from '@/modules/extra-items/hooks/useExtraItems';
import { formatNumber } from '@/common/utils/numbers.util';

const formSetValueOptions = {
  shouldTouch: true,
  shouldDirty: true,
  shouldValidate: true,
};

function FormExtraItemsSection({
  form,
}: {
  form: UseFormReturn<ItemFormValues>;
}) {
  const existExtraItems = useWatch({
    control: form.control,
    name: 'extraItems',
  });

  const addExtraItem = (newExtraItemData: ExtraItem) => {
    form.setValue(
      'extraItems',
      [...existExtraItems, newExtraItemData],
      formSetValueOptions,
    );
  };

  const deleteExtraItem = (extraItemId: number) => {
    const filterExtraItems = existExtraItems.filter(
      (extraItem) => extraItem.id !== extraItemId,
    );
    form.setValue('extraItems', filterExtraItems, formSetValueOptions);
  };

  return (
    <div
      className={cn('col-span-full flex w-full flex-col mt-8', {
        'gap-5': existExtraItems.length,
      })}>
      <span className='flex items-center'>
        <h1 className='px-3 text-text-light'>آیتم های اضافی</h1>
        <FormExtraItemSectionDialog
          existExtraItems={existExtraItems}
          addExtraItem={addExtraItem}
          deleteExtraItem={deleteExtraItem}
        />
      </span>
      <div className='grid w-full grid-cols-1 lg:grid-cols-3 gap-5'>
        {existExtraItems.map((extraItem, index) => {
          return (
            <Card
              key={`extraItem-card:${index}`}
              image={extraItem.image}
              title={extraItem.translations[0].name}
              description={`${formatNumber(extraItem.price, {
                toPersian: true,
                withCommas: true,
              })} تومان`}
              descriptionAlign='vertical'
              actions={
                <CardIconButton
                  icon='XMark'
                  onClick={() => deleteExtraItem(extraItem.id)}
                />
              }
            />
          );
        })}
      </div>
    </div>
  );
}

function FormExtraItemSectionDialog({
  existExtraItems,
  addExtraItem,
  deleteExtraItem,
}: {
  existExtraItems: ExtraItem[] | [];
  addExtraItem: (newExtraItem: ExtraItem) => void;
  deleteExtraItem: (extraItemId: number) => void;
}) {
  const { data: tags } = useExtraItems();

  return (
    <Dialog>
      <DialogTrigger>
        <CardIconButton
          icon='Plus'
          size={'icon-sm'}
          variant={'outline-icon'}
          className='rounded-xs'
        />
      </DialogTrigger>

      <DialogContent className='max-w-none w-11/12'>
        <DialogHeader>
          <DialogTitle>آیتم های اضافی</DialogTitle>
        </DialogHeader>

        {tags && (
          <div className='h-auto w-full overflow-x-auto rounded-sm bg-transparent shadow-c-xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
            {tags.map((extraItem, index) => {
              const currentExtraItemExist = existExtraItems.filter(
                (existExtraItem) => existExtraItem.id === extraItem.id,
              );
              return (
                <Card
                  key={`extraItem-card:${index}`}
                  image={extraItem.image}
                  title={extraItem.translations[0].name}
                  description={`${formatNumber(extraItem.price, {
                    toPersian: true,
                    withCommas: true,
                  })} تومان`}
                  descriptionAlign='horizontal'
                  actions={
                    currentExtraItemExist?.length ? (
                      <CardIconButton
                        icon='Trash'
                        onClick={() => deleteExtraItem(extraItem.id)}
                      />
                    ) : (
                      <CardIconButton
                        icon='Plus'
                        onClick={() => addExtraItem(extraItem)}
                      />
                    )
                  }
                />
              );
            })}
          </div>
        )}

        <DialogFooter>
          <DialogClose
            asChild
            className='w-1/2'>
            <Button
              type='button'
              className='w-full p-5'
              variant={'secondary'}>
              انصراف
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { FormExtraItemsSection };
