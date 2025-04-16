import { ContentSection } from '@/common/components/content-section';
import { UseFormReturn } from 'react-hook-form';
import TagForm, { TagFormValues } from '../components/tag-form';
import { useCreateTag } from '../hooks/useCreateTag';

export default function AddTagPage() {
  const { mutateAsync: createTag } = useCreateTag();

  const addTagAction = async (
    data: TagFormValues,
    form: UseFormReturn<TagFormValues>,
  ) => {
    console.log(data);
    const formData = new FormData();
    formData.append('translations', JSON.stringify(data.translations));
    formData.append('restaurant_id', '1');
    formData.append('branch_id', '0');
    formData.append('is_hidden', JSON.stringify(data.is_hidden));
    formData.append('image', data.image[0]);
    const res = await createTag(formData);
    if (res.status === 201) form.reset();
  };

  return (
    <>
      <ContentSection title='افزودن تگ'>
        <TagForm formAction={addTagAction} />
      </ContentSection>
    </>
  );
} 