import { ContentSection } from '@/common/components/content-section';

import ItemForm, { ExtraItemFormValues } from '../components/extra-item-form';
import { useLocation } from 'react-router';
import { UseFormReturn } from 'react-hook-form';
import { Translation } from '@/modules/languages/interfaces/translation.interface';
import { useExtraItem } from '../hooks/useExtraItem';
import { useUpdateExtraItem } from '../hooks/useUpdateExtraItem';

export default function EditExtraItemPage() {
  const pathname = useLocation().pathname;
  const id = pathname.split('/')[pathname.split('/').length - 1];
  const { data: extraItem, isLoading: isLoadingExtraItem } = useExtraItem(+id);
  const { mutateAsync: updateExtraItem } = useUpdateExtraItem();

  const updateItemAction = async (
    data: ExtraItemFormValues,
    form: UseFormReturn<ExtraItemFormValues>,
  ) => {
    const formData = new FormData();
    const changedFormKeys = Object.keys(form.formState.dirtyFields);

    formData.append('restaurant_id', '1');
    formData.append('branch_id', '0');

    changedFormKeys.forEach((key) => {
      const findData = data[key as keyof ExtraItemFormValues];
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

    await updateExtraItem({ id: +id, extraItem: formData });
  };

  return (
    <>
      <ContentSection title='ویرایش آیتم اضافه'>
        {isLoadingExtraItem ? (
          <h1>amir</h1>
        ) : (
          <ItemForm
            initialValue={extraItem}
            formAction={updateItemAction}
          />
        )}
      </ContentSection>
    </>
  );
}
