import { ContentSection } from '@/common/components/content-section';
import { UseFormReturn } from 'react-hook-form';
import ItemForm, { ItemFormValues } from '../components/item-form';
import { useCreateItem } from '../hooks/useCreateItem';

export default function AddItemPage() {
  const { mutateAsync: createItem } = useCreateItem();

  const addItemAction = async (
    data: ItemFormValues,
    form: UseFormReturn<ItemFormValues>,
  ) => {
    const formData = new FormData();
    formData.append('restaurant_id', '1');
    formData.append('branch_id', '0');
    formData.append('translations', JSON.stringify(data.translations));
    formData.append('image', data.image[0]);
    formData.append('category_id', data.category_id);
    if (data.subcategory_id !== '0')
      formData.append('subcategory_id', data.subcategory_id);
    formData.append('price', data.price.toString());
    formData.append('discount', data.discount.toString());
    formData.append('is_hidden', JSON.stringify(data.is_hidden));
    formData.append('is_available', JSON.stringify(data.is_available));

    // for (const element of formData) {
    //   console.log(element[0], element[1]);
    // }
    const res = await createItem(formData);
    if (res.status === 201) form.reset();
  };

  return (
    <>
      <ContentSection title='افزودن محصول'>
        <ItemForm formAction={addItemAction} />
      </ContentSection>
    </>
  );
}
