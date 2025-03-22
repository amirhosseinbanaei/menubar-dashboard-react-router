import { ContentSection } from '@/common/components/content-section';
import CategoryForm, { CategoryFormValues } from '../components/category-form';
import { useCreateCategory } from '../hooks/useCreateCategory';
import { UseFormReturn } from 'react-hook-form';
export default function AddCategoryPage() {
  const { mutateAsync: createCategory } = useCreateCategory();

  const addCategoryAction = async (
    data: CategoryFormValues,
    form: UseFormReturn<CategoryFormValues>,
  ) => {
    const formData = new FormData();
    formData.append('restaurant_id', '1');
    formData.append('branch_id', '0');
    formData.append('image', data.image[0]);
    formData.append('translations', JSON.stringify(data.translations));
    const res = await createCategory(formData);
    if (res.status == 201) form.reset();
  };

  return (
    <>
      <ContentSection title='افزودن دسته بندی'>
        <CategoryForm formAction={addCategoryAction} />
      </ContentSection>
    </>
  );
}