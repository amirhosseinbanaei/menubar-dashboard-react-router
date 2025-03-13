import { ReactNode, useEffect } from 'react';
import { Controller, useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DropZone from '@/common/components/file-drop-zone';
import { FormBuilder } from '@/common/components/form-builder';
import { useLanguages } from '@/modules/languages/hooks/useLanguages';
import type { Category } from '../interfaces/category.interface';
import { TranslationTabs } from '@/common/components/translation-tabs';
import { useTranslation } from 'react-i18next';

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
  images: z
    .array(
      z
        .custom<File>()
        .refine((file) => file instanceof File, 'فایل انتخاب شده معتبر نیست')
        .refine(
          (file) => file.size <= MAX_FILE_SIZE,
          'حجم فایل باید کمتر از 5 مگابایت باشد',
        )
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
          'فقط فرمت های jpg، jpeg، png و webp پذیرفته می‌شود',
        ),
    )
    .max(1, 'حداکثر 1 تصویر می‌توانید انتخاب کنید'),
  translations: z
    .array(categoryTranslationSchema)
    .min(1, 'حداقل یک ترجمه الزامی است'),
});

export type CategoryTranslationValues = z.infer<
  typeof categoryTranslationSchema
>;

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;

interface CategoryFormProps {
  initialValue?: Category;
  formAction: (
    data: FormData,
    form: UseFormReturn<CategoryFormValues>,
  ) => Promise<void>;
  children: ReactNode;
}

function CategoryForm({
  initialValue,
  formAction,
  children,
}: CategoryFormProps) {
  const { data: languages } = useLanguages();
  const { t } = useTranslation();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      images: [],
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
        images: [],
        translations,
      });
    }
  }, [languages, initialValue, form]);

  if (!languages?.length) {
    return null;
  }

  const onSubmit = async (data: CategoryFormValues) => {
    const formData = new FormData();

    if (!initialValue) {
      formData.append('image', data.images[0]);
      formData.append('translations', JSON.stringify(data.translations));
      formData.append('restaurant_id', JSON.stringify(1));
      formData.append('branch_id', JSON.stringify(0));
    } else {
      const newTranslations = [] as CategoryTranslationValues[];
      const changedFields = form.formState.dirtyFields;
      Object.entries(changedFields).forEach(([key, value]) => {
        if (key === 'translations') {
          value.forEach((_, index) => {
            newTranslations.push(data.translations[index]);
          });
        }
        if (key === 'images') formData.append('image', data.images[0]);
      });
      formData.append('translations', JSON.stringify(newTranslations));
    }
    formAction(formData, form);
  };

  return (
    <FormBuilder
      form={form}
      onSubmit={onSubmit}
      buttonTitle={initialValue ? 'ویرایش' : 'افزودن'}
      schema={categoryFormSchema}>
      {/* Image Upload */}
      <Controller
        name='images'
        control={form.control}
        render={({ field: { onChange, value } }) => (
          <DropZone
            files={value}
            accept={{
              'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
            }}
            formKey='images'
            maxFiles={2}
            maxSize={MAX_FILE_SIZE}
            setFiles={(_, files) => onChange(files)}>
            {initialValue?.image && (
              <div className='flex h-56 w-56 flex-shrink-0 items-center justify-center rounded-xs bg-gray-100'>
                <img
                  src={initialValue.image}
                  alt={initialValue.translations[0]?.name || 'Category image'}
                  className='h-auto max-h-56 w-auto max-w-56 rounded-xs object-contain'
                />
              </div>
            )}
          </DropZone>
        )}
      />

      {/* Translation Tabs */}
      {/* <Tabs
        defaultValue={defaultLanguage}
        className='w-full mt-10 -mb-3'>
        <TabsList className='mb-4'>
          {languages.map((lang) => (
            <TabsTrigger
              key={lang.language_code}
              value={lang.language_code}>
              {lang.language_name}
            </TabsTrigger>
          ))}
        </TabsList>

        {languages.map((lang, index) => (
          <TabsContent
            key={lang.language_code}
            value={lang.language_code}>
            <div className='space-y-4'>
              <FormInput<typeof categoryFormSchema>
                form={form}
                name={`translations.${index}.name`}
                label={`نام دسته بندی (${lang.language_name})`}
                placeholder={`نام به ${lang.language_name}`}
              />
              <input
                type='hidden'
                {...form.register(`translations.${index}.language`)}
                value={lang.language_code}
              />
            </div>
          </TabsContent>
        ))}
      </Tabs> */}
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

export default CategoryForm;
