import { ReactNode, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormBuilder } from '@/common/components/form-builder';
import { useLanguages } from '@/modules/languages/hooks/useLanguages';
import { TranslationTabs } from '@/common/components/translation-tabs';
import { useTranslation } from 'react-i18next';
import { Subcategory } from '../interfaces/subcategory.interface';
import { useCreateSubcategory } from '../hooks/useCreateSubcategory';
import { Translation } from '@/modules/languages/interfaces/translation.interface';
import { useUpdateSubcategory } from '../hooks/useUpdateSubcategory';
import { useLocation } from 'react-router';

// Schemas
const subcategoryFormSchema = z.object({
  translations: z
    .array(
      z.object({
        language: z.string(),
        name: z.string().min(2, 'نام دسته بندی الزامی است'),
      }),
    )
    .min(1, 'حداقل یک ترجمه الزامی است'),
});

export type SubcategoryFormValues = z.infer<typeof subcategoryFormSchema>;

interface SubcategoryFormProps {
  children?: ReactNode;
  initialValue?: Subcategory;
}

function SubcategoryForm({ initialValue, children }: SubcategoryFormProps) {
  const { t } = useTranslation();
  const { data: languages } = useLanguages();

  const pathname = useLocation().pathname;
  const categoryId = Number(
    pathname.split('/')[pathname.split('/').length - 1],
  );
  const { mutateAsync: createSubcategory } = useCreateSubcategory({
    categoryId,
  });
  const { mutateAsync: updateSubcategory } = useUpdateSubcategory();
  const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(0);

  const defaultValues: SubcategoryFormValues = {
    translations: [],
  };

  const form = useForm<SubcategoryFormValues>({
    resolver: zodResolver(subcategoryFormSchema),
    defaultValues,
  });

  useEffect(() => {
    if (!languages) return;

    const translations = languages.map((lang) => {
      const foundTranslation = initialValue?.translations.find(
        (t) => t.language === lang.language_code,
      );

      return {
        language: lang.language_code,
        name: foundTranslation?.name || '',
      };
    });

    form.reset({
      ...defaultValues,
      translations,
    });
  }, [languages, initialValue, form.reset]);

  const handleSubmit = (data: SubcategoryFormValues) => {
    const addSubcategoryHandler = async () => {
      if (initialValue) return null;
      const res = await createSubcategory({
        ...data,
        restaurant_id: 1,
        category_id: categoryId!,
      });
      if (res.status == 201) form.reset();
    };

    const updateSubcategoryHandler = async () => {
      if (!initialValue) return null;
      const listOfChangedInputs: Translation[] = [];
      form.formState.dirtyFields.translations?.forEach(
        (input, index) =>
          input && listOfChangedInputs.push(data.translations[index]),
      );
      await updateSubcategory({
        id: initialValue.id,
        subcategory: { translations: listOfChangedInputs },
      });
    };
    addSubcategoryHandler();
    updateSubcategoryHandler();
  };

  if (!languages?.length) return null;

  return (
    <FormBuilder
      form={form}
      onSubmit={handleSubmit}
      type={initialValue ? 'edit' : 'add'}
      schema={subcategoryFormSchema}>
      <div className='mt-3 mb-8'>
        <TranslationTabs
          t={t}
          form={form}
          languages={languages}
          translationsPath={'translations'}
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
      {children}
    </FormBuilder>
  );
}

export default SubcategoryForm;
