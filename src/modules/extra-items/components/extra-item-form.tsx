import { memo, useEffect, useState } from 'react';
import { Controller, useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DropZone, { FileWithPreview } from '@/common/components/file-drop-zone';
import { FormBuilder } from '@/common/components/form-builder';
import { useLanguages } from '@/modules/languages/hooks/useLanguages';
import { TranslationTabs } from '@/common/components/translation-tabs';
import { useTranslation } from 'react-i18next';
import FormControllerLayout from '@/common/components/layouts/form-controller.layout';
import { FormInput, FormSwitch } from '@/common/components/form-fields';
import { ExtraItem } from '../interfaces/extra-item.interface';

// Constants
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

// Schemas
const extraItemTranslationSchema = z.object({
  language: z.string(),
  name: z.string().min(2, 'نام محصول الزامی است'),
  description: z.string().optional(),
});

const extraItemFormSchema = z.object({
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
    .array(extraItemTranslationSchema)
    .min(1, 'حداقل یک ترجمه الزامی است'),
  price: z.string().min(0, 'قیمت باید بیشتر از 0 باشد'),
  is_hidden: z.boolean().optional(),
});

export type ExtraItemTranslationValues = z.infer<
  typeof extraItemTranslationSchema
>;
export type ExtraItemFormValues = z.infer<typeof extraItemFormSchema>;

interface ExtraItemFormProps {
  initialValue?: ExtraItem;
  formAction: (
    data: ExtraItemFormValues,
    form: UseFormReturn<ExtraItemFormValues>,
  ) => Promise<void>;
}

function ExtraItemForm({ initialValue, formAction }: ExtraItemFormProps) {
  const { t } = useTranslation();
  const { data: languages } = useLanguages();
  const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(0);

  const defaultValues: ExtraItemFormValues = {
    image: '',
    translations: [],
    price: '0',
    is_hidden: false,
  };

  const form = useForm<ExtraItemFormValues>({
    resolver: zodResolver(extraItemFormSchema),
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
      price: initialValue?.price.toString() || '0',
      is_hidden: initialValue ? initialValue.is_hidden : false,
    });
  }, [languages, initialValue, form.reset]);

  if (!languages?.length) return null;

  return (
    <FormBuilder
      form={form}
      onSubmit={(data: ExtraItemFormValues) => formAction(data, form)}
      buttonTitle={initialValue ? 'ویرایش' : 'افزودن'}
      schema={extraItemFormSchema}
      type={initialValue ? 'edit' : 'add'}>
      <div className='mb-8'>
        <ExtraItemFormImageSection form={form} />
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
            label: 'نام محصول',
            placeholder: 'نام به {lang}',
          },
          {
            name: 'description',
            label: 'توضیحات',
            placeholder: 'نام به {lang}',
          },
        ]}
      />

      <FormControllerLayout>
        <FormInput
          form={form}
          name='price'
          label='قیمت'
          type='text'
          placeholder='100,000'
        />
      </FormControllerLayout>

      <div className='my-12 w-full flex flex-col gap-8'>
        <FormSwitch
          form={form}
          name='is_hidden'
          label='پنهان سازی محصول'
        />
      </div>
    </FormBuilder>
  );
}

const ExtraItemFormImageSection = memo(function ExtraItemFormImageSection({
  form,
}: {
  form: UseFormReturn<ExtraItemFormValues>;
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

export default ExtraItemForm;
