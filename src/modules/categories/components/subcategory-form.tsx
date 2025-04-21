// subcategory-form.tsx
import { ReactNode, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLanguages } from '@/modules/languages/hooks/useLanguages';
import { TranslationTabs } from '@/common/components/translation-tabs';
import { useTranslation } from 'react-i18next';
import { Subcategory } from '../interfaces/subcategory.interface';
import { SubcategoryFormValues } from '../interfaces/subcategory-form-value.interface';
import { subcategoryFormSchema } from '../schemas/subcategory-form.schema';


export type { SubcategoryFormValues };

interface SubcategoryFormProps {
  children?: ReactNode;
  initialValue?: Subcategory;
  // onSubmit: (
  //   data: SubcategoryFormValues,
  //   form: UseFormReturn<SubcategoryFormValues>,
  // ) => void;
}

function SubcategoryForm({
  initialValue,
  // onSubmit,
  children,
}: SubcategoryFormProps) {
  const { t } = useTranslation();
  const { data: languages } = useLanguages();
  const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(0);

  const form = useForm<SubcategoryFormValues>({
    resolver: zodResolver(subcategoryFormSchema),
    defaultValues: {
      translations: [],
    },
  });

  // Initialize translations based on available languages and initialValue
  useEffect(() => {
    if (!languages) return;
    const translations = languages.map((lang) => {
      const found = initialValue?.translations.find(
        (t) => t.language === lang.language_code,
      );
      return {
        language: lang.language_code,
        name: found?.name || '',
      };
    });

    form.reset({ translations });
  }, [languages, initialValue]);

  if (!languages?.length) return null;

  return (
    // <FormBuilder
    //   form={form}
    //   onSubmit={(data, form) => onSubmit(data, form)}
    //   type={initialValue ? 'edit' : 'add'}
    //   schema={subcategoryFormSchema}
    //   buttonTitle='افزودن'>
    //   <div className='mt-3 mb-8'>
    //     <TranslationTabs
    //       t={t}
    //       form={form}
    //       languages={languages}
    //       translationsPath='translations'
    //       selectedLanguageIndex={selectedLanguageIndex}
    //       setSelectedLanguageIndex={setSelectedLanguageIndex}
    //       fields={[
    //         {
    //           name: 'name',
    //           label: 'نام زیر دسته',
    //           placeholder: 'نام به {lang}',
    //         },
    //       ]}
    //     />
    //   </div>
    // </FormBuilder>
    <FormProvider {...form}>
      <form>
        <div className='mt-3 mb-8'>
          <TranslationTabs
            t={t}
            form={form}
            languages={languages}
            translationsPath='translations'
            selectedLanguageIndex={selectedLanguageIndex}
            setSelectedLanguageIndex={setSelectedLanguageIndex}
            fields={[
              {
                name: 'name',
                label: 'نام زیر دسته',
                placeholder: 'نام به {lang}',
              },
            ]}
          />
        </div>
        {/* <FormFooter>
          <AddToFormButton
            form={form}
            buttonAction={(e) => onSubmit(e)}
          />
          {children}
        </FormFooter> */}
        {children}
      </form>
    </FormProvider>
  );
}

export default SubcategoryForm;
