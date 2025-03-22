import { memo, ReactNode, useEffect, useState } from 'react';
import { Controller, useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DropZone, { FileWithPreview } from '@/common/components/file-drop-zone';
import { FormBuilder } from '@/common/components/form-builder';
import { useLanguages } from '@/modules/languages/hooks/useLanguages';
import type { Category } from '../interfaces/category.interface';
import { TranslationTabs } from '@/common/components/translation-tabs';
import { useTranslation } from 'react-i18next';
import FormControllerLayout from '@/common/components/layouts/form-controller.layout';
// Constants
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

// Schemas
const categoryTranslationSchema = z.object({
  language: z.string(),
  name: z.string().min(2, 'نام دسته بندی الزامی است'),
});

const categoryFormSchema = z.object({
  image: z
    .array(
      z.union([
        z
          .custom<FileWithPreview>()
          .refine((file) => file instanceof File, 'فایل انتخاب شده معتبر نیست')
          .refine(
            (file) => file.size <= MAX_FILE_SIZE,
            'حجم فایل باید کمتر از 5 مگابایت باشد',
          )
          .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
            'فقط فرمت های jpg، jpeg، png و webp پذیرفته می‌شود',
          ),
        z.string(),
      ]),
    )
    .max(1, 'حداکثر 1 تصویر می‌توانید انتخاب کنید')
    .or(z.literal('')),
  translations: z
    .array(categoryTranslationSchema)
    .min(1, 'حداقل یک ترجمه الزامی است'),
  subcategories: z.object({
    translations: z.array(categoryTranslationSchema).optional(),
  }),
});

export type CategoryTranslationValues = z.infer<
  typeof categoryTranslationSchema
>;

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;

interface CategoryFormProps {
  initialValue?: Category;
  formAction: (
    data: CategoryFormValues,
    form: UseFormReturn<CategoryFormValues>,
  ) => Promise<void>;
  children?: ReactNode;
}

function CategoryForm({
  initialValue,
  formAction,
  children,
}: CategoryFormProps) {
  const { t } = useTranslation();
  const { data: languages } = useLanguages();
  const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(0);

  const defaultValues: CategoryFormValues = {
    image: '',
    translations: [],
    subcategories: { translations: [] },
  };

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
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
      image: initialValue ? [initialValue?.image] : '',
    });
  }, [languages, initialValue, form.reset]);

  if (!languages?.length) return null;

  return (
    <FormBuilder
      form={form}
      onSubmit={(data: CategoryFormValues) => formAction(data, form)}
      buttonTitle={initialValue ? 'ویرایش' : 'افزودن'}
      type={initialValue ? 'edit' : 'add'}
      schema={categoryFormSchema}>
      <div className='mb-8'>
        <CategoryFormImageSection form={form} />
      </div>
      <FormControllerLayout>
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
              label: 'نام دسته بندی',
              placeholder: 'نام به {lang}',
            },
          ]}
        />
      </FormControllerLayout>
      {children}
    </FormBuilder>
  );
}

const CategoryFormImageSection = memo(function CategoryFormImageSection({
  form,
}: {
  form: UseFormReturn<CategoryFormValues>;
}) {
  return (
    <Controller
      name='image'
      control={form.control}
      render={({ field: { onChange, value } }) => {
        return (
          <DropZone
            files={value}
            accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] }}
            formKey='image'
            maxFiles={1}
            maxSize={MAX_FILE_SIZE}
            setFiles={(_, files) => onChange(files)}
          />
        );
      }}
    />
  );
});

export default CategoryForm;
