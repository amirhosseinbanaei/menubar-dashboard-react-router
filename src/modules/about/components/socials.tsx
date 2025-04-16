import { useFieldArray, useForm } from 'react-hook-form';
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

interface SocialForm {
  socials: {
    platform: string;
    link: string;
  }[];
}

const socials = [
  { label: 'Instagram', value: 'instagram' },
  { label: 'Phone', value: 'phone' },
  { label: 'Google Map', value: 'google_map' },
  { label: 'Waze', value: 'waze' },
  { label: 'Neshan', value: 'neshan' },
  { label: 'Balad', value: 'balad' },
];

export function Socials() {
  const form = useForm<SocialForm>({
    defaultValues: {
      socials: [{ platform: '', link: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'socials',
  });

  const onSubmit = (data: SocialForm) => {
    console.log(data);
  };

  return (
    <FormBuilder
      form={form}
      onSubmit={onSubmit}>
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
                onClick={() => append({ platform: '', link: '' })}>
                افزودن فیلد بیشتر
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </FormBuilder>
  );
}
