import { ContentSection } from '@/common/components/content-section';
import CategoryForm, { CategoryFormValues } from '../components/category-form';
import { useCreateCategory } from '../hooks/useCreateCategory';
import { UseFormReturn } from 'react-hook-form';
export default function AddCategoryPage() {
  const { mutateAsync: createCategory } = useCreateCategory();
  
  const addCategoryAction = async (
    data: FormData,
    form: UseFormReturn<CategoryFormValues>,
  ) => {
    const res = await createCategory(data);
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
