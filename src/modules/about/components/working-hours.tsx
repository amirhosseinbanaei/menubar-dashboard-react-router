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
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMemo } from 'react';

const workingHourSchema = z.object({
  workingHours: z.array(
    z.object({
      day: z.string().min(1, 'روز الزامی است'),
      openTime: z.string().min(1, 'زمان شروع الزامی است'),
      closeTime: z.string().min(1, 'زمان پایان الزامی است'),
    }),
  ),
});

interface WorkingHourForm {
  workingHours: {
    day: string;
    openTime: string;
    closeTime: string;
  }[];
}

const days = [
  { label: 'شنبه', value: 'saturday' },
  { label: 'یکشنبه', value: 'sunday' },
  { label: 'دوشنبه', value: 'monday' },
  { label: 'سه‌شنبه', value: 'tuesday' },
  { label: 'چهارشنبه', value: 'wednesday' },
  { label: 'پنج‌شنبه', value: 'thursday' },
  { label: 'جمعه', value: 'friday' },
];

export function WorkingHours() {
  const form = useForm<WorkingHourForm>({
    resolver: zodResolver(workingHourSchema),
    defaultValues: {
      workingHours: [{ day: '', openTime: '', closeTime: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'workingHours',
  });

  const onSubmit = (data: WorkingHourForm) => {
    console.log(data);
  };

  const handleAddWorkingHours = () => {
    const values = form.getValues();
    const lastIndex = values.workingHours.length - 1;
    const lastEntry = values.workingHours[lastIndex];

    append({
      day: '',
      openTime: lastEntry.openTime,
      closeTime: lastEntry.closeTime,
    });
  };

  // Get the currently selected days to filter options
  const selectedDays = useMemo(() => {
    const values = form.getValues().workingHours;
    return values.map((item) => item.day).filter(Boolean);
  }, [fields, form]);

  // Create filtered day options for each field
  const getAvailableDays = (currentIndex: number) => {
    const currentDay = form.getValues().workingHours[currentIndex]?.day;
    return days.filter(
      (day) => day.value === currentDay || !selectedDays.includes(day.value),
    );
  };

  return (
    <FormBuilder
      type='edit'
      schema={workingHourSchema}
      form={form}
      onSubmit={onSubmit}>
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
                    options={getAvailableDays(index)}
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
                onClick={handleAddWorkingHours}>
                Add Working Hours
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </FormBuilder>
  );
}
