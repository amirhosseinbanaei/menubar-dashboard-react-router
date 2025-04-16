import { memo, useEffect, useState } from 'react';
import { Controller, useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormBuilder } from '@/common/components/form-builder';
import { useLanguages } from '@/modules/languages/hooks/useLanguages';
import { TranslationTabs } from '@/common/components/translation-tabs';
import { useTranslation } from 'react-i18next';
import { FormSwitch } from '@/common/components/form-fields';
import { Tag } from '../interfaces/tag.interface';
import DropZone, { FileWithPreview } from '@/common/components/file-drop-zone';

// Constants
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

// Schemas
const tagTranslationSchema = z.object({
  language: z.string(),
  name: z.string().min(2, 'نام تگ الزامی است'),
  description: z.string().optional(),
});

const tagFormSchema = z.object({
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
    .array(tagTranslationSchema)
    .min(1, 'حداقل یک ترجمه الزامی است'),
  is_hidden: z.boolean().optional(),
});

export type TagTranslationValues = z.infer<typeof tagTranslationSchema>;
export type TagFormValues = z.infer<typeof tagFormSchema>;

interface TagFormProps {
  initialValue?: Tag;
  formAction: (
    data: TagFormValues,
    form: UseFormReturn<TagFormValues>,
  ) => Promise<void>;
}

function TagForm({ initialValue, formAction }: TagFormProps) {
  const { t } = useTranslation();
  const { data: languages } = useLanguages();
  const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(0);

  const defaultValues: TagFormValues = {
    image: '',
    translations: [],
    is_hidden: false,
  };

  const form = useForm<TagFormValues>({
    resolver: zodResolver(tagFormSchema),
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
        description: foundTranslation?.description || '',
      };
    });

    form.reset({
      ...defaultValues,
      translations,
      image: initialValue ? [initialValue?.image] : '',
      is_hidden: initialValue ? initialValue.is_hidden : false,
    });
  }, [languages, initialValue, form.reset]);

  if (!languages?.length) return null;

  return (
    <FormBuilder
      form={form}
      onSubmit={(data: TagFormValues) => formAction(data, form)}
      buttonTitle={initialValue ? 'ویرایش' : 'افزودن'}
      schema={tagFormSchema}
      type={initialValue ? 'edit' : 'add'}>
      <div className='mb-8'>
        <TagFormImageSection form={form} />
      </div>

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
            label: 'نام تگ',
            placeholder: 'نام به {lang}',
          },
          {
            name: 'description',
            label: 'توضیحات',
            placeholder: 'توضیحات به {lang}',
          },
        ]}
      />

      <div className='my-12 w-full flex flex-col gap-8'>
        <FormSwitch
          form={form}
          name='is_hidden'
          label='پنهان سازی تگ'
        />
      </div>
    </FormBuilder>
  );
}

const TagFormImageSection = memo(function TagFormImageSection({
  form,
}: {
  form: UseFormReturn<TagFormValues>;
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

export default TagForm;
