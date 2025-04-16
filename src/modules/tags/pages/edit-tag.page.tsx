import { ContentSection } from '@/common/components/content-section';
import TagForm, { TagFormValues } from '../components/tag-form';
import { useLocation } from 'react-router';
import { UseFormReturn } from 'react-hook-form';
import { Translation } from '@/modules/languages/interfaces/translation.interface';
import { useTag } from '../hooks/useTag';
import { useUpdateTag } from '../hooks/useUpdateTag';

export default function EditTagPage() {
  const pathname = useLocation().pathname;
  const id = pathname.split('/')[pathname.split('/').length - 1];
  const { data: tag, isLoading: isLoadingTag } = useTag(+id);
  const { mutateAsync: updateTag } = useUpdateTag();

  const updateTagAction = async (
    data: TagFormValues,
    form: UseFormReturn<TagFormValues>,
  ) => {
    const formData = new FormData();
    const changedFormKeys = Object.keys(form.formState.dirtyFields);

    changedFormKeys.forEach((key) => {
      const findData = data[key as keyof TagFormValues];
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
        default:
          if (typeof findData === 'string') {
            formData.append(`${key}`, findData);
            break;
          }
          formData.append(`${key}`, JSON.stringify(findData));
          break;
      }
    });

    await updateTag({ id: +id, data: formData });
  };

  return (
    <>
      <ContentSection title='ویرایش تگ'>
        {isLoadingTag ? (
          <h1>Loading...</h1>
        ) : (
          <TagForm
            initialValue={tag}
            formAction={updateTagAction}
          />
        )}
      </ContentSection>
    </>
  );
} 