import { useForm } from 'react-hook-form';
import { useEffect, useMemo, useState } from 'react';
import { useLanguages } from '@/modules/languages/hooks/useLanguages';
import { useTranslation } from 'react-i18next';
import { TranslationTabs } from '@/common/components/translation-tabs';
import { Form } from '@/common/components/ui';
import { Translation } from '@/modules/languages/interfaces/translation.interface';
import { FormButton } from '@/common/components/f-button';

interface AboutForm {
  translations: Translation[];
}

interface AboutProps {
  initialValues?: Translation[];
}

export function About({ initialValues }: AboutProps) {
  const { t } = useTranslation();
  const { data: languages = [] } = useLanguages();
  const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(0);

  const defaultValues = useMemo<AboutForm>(
    () => ({
      translations: initialValues ?? [],
    }),
    [initialValues],
  );

  const form = useForm<AboutForm>({
    defaultValues,
  });

  // Only reset if initialValues change AND are different from current form values
  useEffect(() => {
    if (initialValues?.length) {
      const currentTranslations = form.getValues('translations');
      const hasChanged =
        JSON.stringify(initialValues) !== JSON.stringify(currentTranslations);

      if (hasChanged) {
        form.reset({ translations: initialValues });
      }
    }
  }, [initialValues]);

  const onSubmit = (data: AboutForm) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='mt-10 mb-5'>
          <TranslationTabs
            t={t}
            form={form}
            languages={languages}
            className='h-32'
            translationsPath='translations'
            selectedLanguageIndex={selectedLanguageIndex}
            setSelectedLanguageIndex={setSelectedLanguageIndex}
            fields={[
              {
                name: 'name',
                label: 'نام مجموعه',
                placeholder: 'نام به {lang}',
              },
              {
                name: 'description',
                label: 'توضیحات',
                placeholder: 'توضیحات به {lang}',
              },
            ]}
          />
        </div>
        <div className='flex gap-4 mb-5 mt-8 justify-end'>
          <FormButton
            formState={form.formState}
            action='edit'
            title='اعمال تغییرات'
            onClick={(e) => console.log(e)}
          />
        </div>
      </form>
    </Form>
  );
}
