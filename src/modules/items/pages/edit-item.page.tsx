import { ContentSection } from '@/common/components/content-section';
import ItemForm, { ItemFormValues } from '../components/item-form';
import { useLocation } from 'react-router';
import { useItem } from '../hooks/useItem';
import { useUpdateItem } from '../hooks/useUpdateItem';
import { UseFormReturn } from 'react-hook-form';
import { Translation } from '@/modules/languages/interfaces/translation.interface';
import { formatNumber } from '@/common/utils/numbers.util';

export default function EditItemPage() {
  const pathname = useLocation().pathname;
  const id = pathname.split('/')[pathname.split('/').length - 1];
  const { data: item, isLoading: isLoadingItem } = useItem(+id);
  const { mutateAsync: updateItem } = useUpdateItem();

  const updateItemAction = async (
    data: { tagIds: number[]; extraItemIds: number[] } & ItemFormValues,
    form: UseFormReturn<ItemFormValues>,
  ) => {
    const formData = new FormData();
    data.price = formatNumber(data.price, {
      toPersian: false,
      withCommas: false,
    });
    data.discount = formatNumber(data.discount, {
      toPersian: false,
      withCommas: false,
    });
    const changedFormKeys = Object.keys(form.formState.dirtyFields);

    formData.append('restaurant_id', '1');
    formData.append('branch_id', '0');

    // Add tag and extra item IDs
    formData.append('tag_ids', JSON.stringify(data.tagIds));
    formData.append('extra_item_ids', JSON.stringify(data.extraItemIds));

    changedFormKeys.forEach((key) => {
      const findData = data[key as keyof ItemFormValues];
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
        default:
          if (typeof findData === 'string') {
            formData.append(`${key}`, findData);
            break;
          }
          formData.append(`${key}`, JSON.stringify(findData));
          break;
      }
    });

    await updateItem({ id: +id, item: formData });
    // No need to reset form after update
  };

  return (
    <>
      <ContentSection title='ویرایش محصول'>
        {isLoadingItem ? (
          <h1>Loading...</h1>
        ) : (
          <ItemForm
            initialValue={item}
            formAction={updateItemAction}
          />
        )}
      </ContentSection>
    </>
  );
}
