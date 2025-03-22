import { ReactNode, useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormBuilder } from '@/common/components/form-builder';
import { useLanguages } from '@/modules/languages/hooks/useLanguages';
import type { Category } from '../interfaces/item.interface';
import { TranslationTabs } from '@/common/components/translation-tabs';
import { useTranslation } from 'react-i18next';
import { CreateSubcategory } from '../interfaces/create-subcategory.interface';

// Schemas
const subcategoryTranslationSchema = z.object({
  language: z.string(),
  name: z.string().min(2, 'نام دسته بندی الزامی است'),
});

const subcategoryFormSchema = z.object({
  translations: z
    .array(subcategoryTranslationSchema)
    .min(1, 'حداقل یک ترجمه الزامی است'),
});

export type SubcategoryTranslationValues = z.infer<
  typeof subcategoryTranslationSchema
>;

export type SubcategoryFormValues = z.infer<typeof subcategoryFormSchema>;

interface SubcategoryFormProps {
  initialValue?: Category;
  formAction: (
    data: CreateSubcategory,
    form: UseFormReturn<SubcategoryFormValues>,
  ) => void;
  children: ReactNode;
}

function SubcategoryForm({
  initialValue,
  formAction,
  children,
}: SubcategoryFormProps) {
  const { data: languages } = useLanguages();
  const { t } = useTranslation();

  const form = useForm<SubcategoryFormValues>({
    resolver: zodResolver(subcategoryFormSchema),
    defaultValues: {
      translations: [],
    },
  });

  // Initialize translations when languages are loaded
  useEffect(() => {
    if (languages) {
      const translations = languages.map((lang) => ({
        language: lang.language_code,
        name:
          initialValue?.translations.find(
            (t) => t.language === lang.language_code,
          )?.name || '',
      }));

      form.reset({
        translations,
      });
    }
  }, [languages, initialValue, form]);

  if (!languages?.length) {
    return null;
  }

  const onSubmit = async (data: SubcategoryFormValues) => {
    if (initialValue) {
      const newTranslations = [] as SubcategoryTranslationValues[];
      const changedFields = form.formState.dirtyFields;
      Object.entries(changedFields).forEach(([key, value]) => {
        if (key === 'translations') {
          value.forEach((_, index) => {
            newTranslations.push(data.translations[index]);
          });
        }
      });
      formAction(
        {
          restaurant_id: 1,
          category_id: 3,
          translations: newTranslations,
        },
        form,
      );
    }
    formAction(
      {
        restaurant_id: 1,
        category_id: 3,
        translations: data.translations,
      },
      form,
    );
  };

  return (
    <FormBuilder
      form={form}
      onSubmit={onSubmit}
      // buttonTitle={initialValue ? 'ویرایش' : 'افزودن'}
      schema={subcategoryFormSchema}>
      <TranslationTabs
        form={form}
        languages={languages}
        t={t}
        translationsPath='translations'
        fields={[
          {
            name: 'name',
            label: 'نام دسته بندی به ',
            placeholder: 'نام به {lang}',
          },
          // Add more fields if needed
        ]}
      />
      {children}
    </FormBuilder>
  );
}

export default SubcategoryForm;
