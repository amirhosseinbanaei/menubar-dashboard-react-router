import { memo, useEffect, useMemo, useState } from 'react';
import { Controller, useForm, UseFormReturn, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DropZone, { FileWithPreview } from '@/common/components/file-drop-zone';
import { FormBuilder } from '@/common/components/form-builder';
import { useLanguages } from '@/modules/languages/hooks/useLanguages';
import { Item } from '../interfaces/item.interface';
import { TranslationTabs } from '@/common/components/translation-tabs';
import { useTranslation } from 'react-i18next';
import FormControllerLayout from '@/common/components/layouts/form-controller.layout';
import {
  FormInput,
  FormSelect,
  FormSwitch,
} from '@/common/components/form-fields';
import { useCategories } from '@/modules/categories/hooks/useCategories';
import { Category } from '@/modules/categories/interfaces/category.interface';
import { Subcategory } from '@/modules/categories/interfaces/subcategory.interface';
import { SelectItem } from '@/common/components/ui/select';

// Constants
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

// Schemas
const itemTranslationSchema = z.object({
  language: z.string(),
  name: z.string().min(2, 'نام محصول الزامی است'),
  description: z.string().optional(),
});

const itemFormSchema = z.object({
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
    .array(itemTranslationSchema)
    .min(1, 'حداقل یک ترجمه الزامی است'),
  price: z.number().min(0, 'قیمت باید بیشتر از 0 باشد'),
  discount: z.number().min(0, 'تخفیف باید بیشتر از 0 باشد'),
  category_id: z
    .string()
    .min(1, 'دسته بندی الزامی است')
    .refine((value) => value !== '0', 'قیمت نمی‌تواند برابر با 0 باشد'),
  subcategory_id: z.string().optional().default('0'),
  is_available: z.boolean().optional(),
  is_hidden: z.boolean().optional(),
});

export type ItemTranslationValues = z.infer<typeof itemTranslationSchema>;
export type ItemFormValues = z.infer<typeof itemFormSchema>;

interface ItemFormProps {
  initialValue?: Item;
  formAction: (
    data: ItemFormValues,
    form: UseFormReturn<ItemFormValues>,
  ) => Promise<void>;
}

function ItemForm({ initialValue, formAction }: ItemFormProps) {
  const { t } = useTranslation();
  const { data: languages } = useLanguages();
  const { data: categories } = useCategories(true);
  const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(0);

  const defaultValues: ItemFormValues = {
    image: '',
    translations: [],
    price: 0,
    discount: 0,
    category_id: '0',
    subcategory_id: '0',
    is_available: false,
    is_hidden: false,
  };

  const form = useForm<ItemFormValues>({
    resolver: zodResolver(itemFormSchema),
    defaultValues,
  });

  const selectedCategoryId = useWatch({
    control: form.control,
    name: 'category_id',
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
      price: initialValue?.price || 0,
      discount: initialValue?.discount || 0,
      category_id: initialValue?.category_id?.toString() || '0',
      subcategory_id: initialValue?.subcategory_id?.toString() || '0',
      is_available: initialValue ? initialValue?.is_available : true,
      is_hidden: initialValue ? initialValue.is_hidden : false,
    });
  }, [languages, initialValue, form]);

  const categoryOptions = useMemo(
    () =>
      categories?.map((category: Category) => ({
        value: String(category.id),
        label: category.translations[0].name,
      })) || [],
    [categories],
  );

  const subcategoryOptions: [] = useMemo(() => {
    if (!selectedCategoryId || !categories) return [];

    const selectedCategory = categories.find(
      (category: Category) => category.id === Number(selectedCategoryId),
    );

    if (selectedCategory) {
      return (
        selectedCategory?.subcategories?.map((subcategory: Subcategory) => {
          return {
            value: String(subcategory.id),
            label: subcategory.translations[0].name,
          };
        }) || []
      );
    }
  }, [selectedCategoryId, categories]);

  if (!languages?.length) return null;

  // const handleSubmit = async (data: ItemFormValues) => {
  //   const formData = new FormData();
  //   const changedFormKeys = Object.keys(form.formState.dirtyFields);

  //   formData.append('restaurant_id', '1');
  //   formData.append('branch_id', '0');

  //   if (initialValue) {
  //     if (changedFormKeys.includes('translations')) {
  //       const numberOfInput = form.formState.dirtyFields.translations
  //         ?.length as number;
  //       const updatedTranslations = [];
  //       for (let i = 0; i < numberOfInput; i++) {
  //         updatedTranslations.push(data.translations[i]);
  //       }

  //       formData.append('translations', JSON.stringify(updatedTranslations));
  //     }
  //     changedFormKeys.forEach((key) => console.log(key));
  //     // appendSimpleValueToFormData();
  //   } else {
  //     Object.entries(data).forEach(([formKey, formValue]) => {
  //       if (typeof formValue === 'string') {
  //         formData.append(formKey, formValue);
  //       } else {
  //         if (formKey === 'image') {
  //           formData.append('image', data.image[0]);
  //         } else {
  //           formData.append(formKey, JSON.stringify(formValue));
  //         }
  //       }
  //     });
  //   }

  //   // await formAction(formData, form);

  //   // if (!initialValue) {
  //   //   formData.append('image', data.image[0]);
  //   //   formData.append('translations', JSON.stringify(data.translations));
  //   //   formData.append('restaurant_id', '1');
  //   //   formData.append('branch_id', '0');
  //   //   formData.append('category_id', '6');
  //   //   formData.append('subcategory_id', '15');
  //   //   formData.append('price', JSON.stringify(data.price));
  //   //   formData.append('discount', JSON.stringify(data.discount));
  //   //   formData.append('is_hidden', JSON.stringify(data.is_hidden));
  //   //   formData.append('is_available', JSON.stringify(data.is_available));
  //   //   await formAction(formData, form);
  //   // } else {
  //   //   // const { dirtyFields } = form.formState;
  //   //   // console.log(dirtyFields);
  //   //   // if (dirtyFields.translations) {
  //   //   //   formData.append('translations', JSON.stringify(data.translations));
  //   //   // }
  //   //   // if (dirtyFields.images) {
  //   //   //   formData.append('image', data.images[0]);
  //   //   // }
  //   //   // if (dirtyFields.category) {
  //   //   //   formData.append('category_id', data.category);
  //   //   // }
  //   //   // if (dirtyFields.subcategory) {
  //   //   //   formData.append('subcategory_id', data.subcategory);
  //   //   // }
  //   //   // if (dirtyFields.price) {
  //   //   //   formData.append('price', String(data.price));
  //   //   // }
  //   //   // if (dirtyFields.discount) {
  //   //   //   formData.append('discount', String(data.discount));
  //   //   // }
  //   //   // if (dirtyFields.isAvailable) {
  //   //   //   formData.append('is_available', String(data.isAvailable));
  //   //   // }
  //   //   // if (dirtyFields.isHidden) {
  //   //   //   formData.append('is_hide', JSON.stringify(data.isHidden));
  //   //   // }
  //   // }
  // };

  return (
    <FormBuilder
      form={form}
      onSubmit={(data: ItemFormValues) => formAction(data, form)}
      buttonTitle={initialValue ? 'ویرایش' : 'افزودن'}
      schema={itemFormSchema}
      type={initialValue ? 'edit' : 'add'}>
      <div className='mb-8'>
        <ItemFormImageSection form={form} />
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
        <FormInput
          form={form}
          name='discount'
          label='تخفیف'
          type='text'
          placeholder='10'
        />
      </FormControllerLayout>

      <FormControllerLayout>
        <FormSelect
          form={form}
          name='category_id'
          label='دسته بندی'
          placeholder='انتخاب کنید ...'
          value={
            initialValue ? initialValue.category_id?.toString() : undefined
          }
          options={categoryOptions}
        />
        {subcategoryOptions && (
          <FormSelect
            form={form}
            label='زیر دسته'
            name='subcategory_id'
            options={subcategoryOptions}
            value={initialValue?.subcategory_id?.toString() ?? '0'}
            customSelectItem={<SelectItem value='0'>بدون زیر دسته</SelectItem>}
          />
        )}
      </FormControllerLayout>
      <div className='my-12 w-full flex flex-col gap-8'>
        <FormSwitch
          form={form}
          name='is_available'
          label='موجودی محصول'
        />

        <FormSwitch
          form={form}
          name='is_hidden'
          label='پنهان سازی محصول'
        />
      </div>
    </FormBuilder>
  );
}

const ItemFormImageSection = memo(function ItemFormImageSection({
  form,
}: {
  form: UseFormReturn<ItemFormValues>;
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

export default ItemForm;
