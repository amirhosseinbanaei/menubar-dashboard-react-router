import { ContentSection } from '@/common/components/content-section';
import { UseFormReturn } from 'react-hook-form';
import ItemForm, { ExtraItemFormValues } from '../components/extra-item-form';
import { useCreateExtraItem } from '../hooks/useCreateExtraItem';

export default function AddExtraItemPage() {
  const { mutateAsync: createExtraItem } = useCreateExtraItem();

  const addItemAction = async (
    data: ExtraItemFormValues,
    form: UseFormReturn<ExtraItemFormValues>,
  ) => {
    const formData = new FormData();
    formData.append('restaurant_id', '1');
    formData.append('branch_id', '0');
    formData.append('translations', JSON.stringify(data.translations));
    formData.append('image', data.image[0]);
    formData.append('price', data.price.toString());
    formData.append('is_hidden', JSON.stringify(data.is_hidden));
    const res = await createExtraItem(formData);
    if (res.status === 201) form.reset();
  };

  return (
    <>
      <ContentSection title='افزودن آیتم اضافه'>
        <ItemForm formAction={addItemAction} />
      </ContentSection>
    </>
  );
}
