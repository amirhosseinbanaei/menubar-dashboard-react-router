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
import { Tag } from '@/modules/tags/interfaces/tag.interface';
import { ExtraItem } from '@/modules/extra-items/interfaces/extra-item.interface';
import { FormTagsSection } from './form-tags-section';
import { formatNumber } from '@/common/utils/numbers.util';
import { FormExtraItemsSection } from './form-extra-items-section';

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
  price: z
    .string()
    .regex(/^[\u06F0-\u06F90-9,]+$/, 'قیمت باید فقط شامل اعداد و کاما باشد')
    .refine((val) => {
      const numValue = Number(formatNumber(val, { removeCommas: true }));
      return numValue >= 0;
    }, 'قیمت باید بزرگتر از صفر باشد')
    .refine(
      (val) => formatNumber(val, { removeCommas: true }).length <= 9,
      'قیمت حداکثر 9 رقم میتواند باشد',
    ),
  discount: z
    .string()
    .regex(/^[\u06F0-\u06F90-9]+$/, 'تخفیف باید فقط شامل اعداد باشد')
    .refine((val) => {
      const numValue = Number(formatNumber(val, { removeCommas: true }));
      return numValue >= 0 && numValue <= 100;
    }, 'تخفیف باید بین 0 تا 100 باشد'),
  category_id: z
    .string()
    .min(1, 'دسته بندی الزامی است')
    .refine((value) => value !== '0', 'قیمت نمی‌تواند برابر با 0 باشد')
    .default(''),
  subcategory_id: z.string().optional().default('0'),
  is_available: z.boolean().optional(),
  is_hidden: z.boolean().optional(),
  tags: z.array(z.custom<Tag>()) as z.ZodType<Tag[] | []>,
  extraItems: z.array(z.custom<ExtraItem>()) as z.ZodType<ExtraItem[] | []>,
});

export type ItemTranslationValues = z.infer<typeof itemTranslationSchema>;
export type ItemFormValues = z.infer<typeof itemFormSchema>;

interface ItemFormProps {
  initialValue?: Item;
  formAction: (
    data: { tagIds: number[]; extraItemIds: number[] } & ItemFormValues,
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
    price: '0',
    discount: '0',
    category_id: '',
    subcategory_id: '0',
    is_available: false,
    is_hidden: false,
    tags: [],
    extraItems: [],
  };

  const form = useForm<ItemFormValues>({
    resolver: zodResolver(itemFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const selectedCategoryId = useWatch({
    control: form.control,
    name: 'category_id',
  });

  const watchPrice = useWatch({
    control: form.control,
    name: 'price',
  });

  const watchDiscount = useWatch({
    control: form.control,
    name: 'discount',
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
      discount: initialValue?.discount.toString() || '0',
      category_id: initialValue?.category_id?.toString() || '',
      subcategory_id: initialValue?.subcategory_id?.toString() || '0',
      is_available: initialValue ? initialValue?.is_available : true,
      is_hidden: initialValue ? initialValue.is_hidden : false,
      tags: initialValue?.tags || [],
      extraItems: initialValue?.extra_items || [],
    });
  }, [languages, initialValue, form.reset]);

  useEffect(() => {
    if (watchPrice) {
      const formattedPrice = formatNumber(watchPrice, {
        withCommas: true,
        toPersian: true,
      });
      if (formattedPrice !== watchPrice) {
        form.setValue('price', formattedPrice, { shouldValidate: true });
      }
    }
  }, [watchPrice, form]);

  useEffect(() => {
    if (watchDiscount) {
      const formattedDiscount = formatNumber(watchDiscount, {
        withCommas: false,
        toPersian: true,
      });
      if (formattedDiscount !== watchDiscount) {
        form.setValue('discount', formattedDiscount, {
          shouldValidate: true,
        });
      }
    }
  }, [watchDiscount, form]);

  const categoryOptions = useMemo(
    () =>
      categories?.map((category: Category) => ({
        value: String(category.id),
        label: category.translations[0].name,
      })) || [],
    [categories],
  );

  const subcategoryOptions = useMemo(() => {
    if (!selectedCategoryId || !categories) return [];

    const selectedCategory = categories.find(
      (category: Category) => category.id === Number(selectedCategoryId),
    );

    if (selectedCategory) {
      return (
        selectedCategory?.subcategories?.map((subcategory: Subcategory) => {
          return {
            value: String(subcategory.id),
            label: subcategory.translations[0]?.name,
          };
        }) || []
      );
    }
  }, [selectedCategoryId, categories]);

  const handleSubmitForm = async (data: ItemFormValues) => {
    const tagIds = data.tags?.map((tag) => tag.id) || [];
    const extraItemIds =
      data.extraItems?.map((extraItem) => extraItem.id) || [];
    formAction({ ...data, tagIds, extraItemIds }, form);
  };

  if (!languages?.length) return null;

  return (
    <FormBuilder
      form={form}
      onSubmit={handleSubmitForm}
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
          defaultValue={initialValue?.category_id?.toString()}
          options={categoryOptions}
        />
        {subcategoryOptions && (
          <FormSelect
            form={form}
            label='زیر دسته'
            name='subcategory_id'
            options={subcategoryOptions}
            defaultValue={initialValue?.subcategory_id?.toString() || '0'}
            customSelectItem={<SelectItem value='0'>بدون زیر دسته</SelectItem>}
          />
        )}
      </FormControllerLayout>

      <FormTagsSection form={form} />

      <FormExtraItemsSection form={form} />

      <div className='mb-12 mt-8 w-full flex flex-col gap-8'>
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
