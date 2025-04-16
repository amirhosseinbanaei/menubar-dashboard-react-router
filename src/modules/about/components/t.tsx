import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { FormBuilder } from '@/common/components/form-builder';
import { Button } from '@/common/components/ui/button';
import { FormInput, FormSelect } from '@/common/components/form-fields';
import { XMarkIcon } from '@heroicons/react/24/outline';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/common/components/ui/accordion';
import { useState } from 'react';
import { useLanguages } from '@/modules/languages/hooks/useLanguages';
import { useTranslation } from 'react-i18next';
import { TranslationTabs } from '@/common/components/translation-tabs';
import DropZone from '@/common/components/file-drop-zone';

interface WorkingHourForm {
  workingHours: {
    day: string;
    openTime: string;
    closeTime: string;
  }[];
  socials: {
    platform: string;
    link: string;
  }[];
  image: string[];
}

const days = [
  { label: 'Monday', value: 'monday' },
  { label: 'Tuesday', value: 'tuesday' },
  { label: 'Wednesday', value: 'wednesday' },
  { label: 'Thursday', value: 'thursday' },
  { label: 'Friday', value: 'friday' },
  { label: 'Saturday', value: 'saturday' },
  { label: 'Sunday', value: 'sunday' },
];

const socials = [
  { label: 'Instagram', value: 'instagram' },
  { label: 'Phone', value: 'phone' },
  { label: 'Google Map', value: 'google_map' },
  { label: 'Waze', value: 'waze' },
  { label: 'Neshan', value: 'neshan' },
  { label: 'Balad', value: 'balad' },
];

export function WorkingHoursForm() {
  const { t } = useTranslation();
  const { data: languages } = useLanguages();
  const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(0);
  const form = useForm<WorkingHourForm>({
    defaultValues: {
      workingHours: [{ day: '', openTime: '', closeTime: '' }],
      socials: [{ platform: '', link: '' }],
      image: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'workingHours',
  });

  const onSubmit = (data: WorkingHourForm) => {
    console.log(data);
  };

  return (
    <FormBuilder
      form={form}
      onSubmit={onSubmit}>
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
              maxSize={5 * 1024 * 1024}
              setFiles={(_, files) => onChange(files)}
            />
          );
        }}
      />

      <div className='mt-10 mb-5'>
        <TranslationTabs
          t={t}
          form={form}
          languages={languages}
          translationsPath='translations'
          selectedLanguageIndex={selectedLanguageIndex}
          setSelectedLanguageIndex={setSelectedLanguageIndex}
          fields={[
            {
              name: 'description',
              label: 'توضیحات',
              placeholder: 'نام به {lang}',
            },
          ]}
        />
      </div>

      <Accordion
        type='single'
        collapsible
        defaultChecked
        defaultValue='item-1'>
        <AccordionItem value='item-1'>
          <AccordionTrigger>ساعت کاری مجموعه</AccordionTrigger>
          <AccordionContent>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className='w-full flex items-center gap-5 mb-8'>
                <div className='w-[calc(100%-36px)] grid grid-cols-3 gap-5'>
                  <FormSelect
                    form={form}
                    name={`workingHours.${index}.day`}
                    label='Day'
                    options={days}
                  />

                  <FormInput
                    type='time'
                    name={`workingHours.${index}.openTime`}
                    label='Open Time'
                    placeholder='HH:MM'
                    form={form}
                  />

                  <FormInput
                    type='time'
                    name={`workingHours.${index}.closeTime`}
                    label='Close Time'
                    placeholder='HH:MM'
                    form={form}
                  />
                </div>

                {fields.length > 1 && (
                  <Button
                    type='button'
                    variant='outline-icon'
                    size={'icon'}
                    className='border-destructive mt-8'
                    onClick={() => remove(index)}>
                    <XMarkIcon className='text-destructive size-5' />
                  </Button>
                )}
              </div>
            ))}

            <div className='flex gap-4'>
              <Button
                type='button'
                variant='outline'
                onClick={() =>
                  append({ day: '', openTime: '', closeTime: '' })
                }>
                Add Working Hours
              </Button>
              <Button type='submit'>Save</Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion
        type='single'
        collapsible
        defaultChecked
        defaultValue='item-1'>
        <AccordionItem value='item-1'>
          <AccordionTrigger>شبکه های اجتماعی</AccordionTrigger>
          <AccordionContent>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className='w-full flex items-center gap-5 mb-8'>
                <div className='w-[calc(100%-36px)] grid grid-cols-2 gap-5'>
                  <FormSelect
                    form={form}
                    name={`socials.${index}.platform`}
                    label='شبکه اجتماعی'
                    options={socials}
                  />

                  <FormInput
                    type='text'
                    name={`socials.${index}.link`}
                    label='لینک یا شماره'
                    form={form}
                  />
                </div>

                {fields.length > 1 && (
                  <Button
                    type='button'
                    variant='outline-icon'
                    size={'icon'}
                    className='border-destructive mt-8'
                    onClick={() => remove(index)}>
                    <XMarkIcon className='text-destructive size-5' />
                  </Button>
                )}
              </div>
            ))}

            <div className='flex gap-4'>
              <Button
                type='button'
                variant='outline'
                onClick={() =>
                  append({ day: '', openTime: '', closeTime: '' })
                }>
                افزودن فیلد بیشتر
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </FormBuilder>
  );
}
