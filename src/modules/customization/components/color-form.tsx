import { FormBuilder } from '@/common/components/form-builder';
import FormControllerLayout from '@/common/components/layouts/form-controller.layout';
import { useRef } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ColorInput } from './color-input';
import { ColorFormValues, colorSchema } from './color-types';
import { FormInput } from '@/common/components/form-fields';

interface ColorFormProps {
  initialValues: ColorFormValues;
  onColorChange: (name: string, value: string) => void;
  onSubmit: (data: ColorFormValues, form: UseFormReturn<ColorFormValues>) => void;
}

export const ColorForm = ({
  initialValues,
  onColorChange,
  onSubmit,
}: ColorFormProps) => {
  // Form reference to avoid unnecessary re-renders
  const formRef = useRef(
    useForm<ColorFormValues>({
      resolver: zodResolver(colorSchema),
      defaultValues: initialValues,
    }),
  );

  return (
    <FormBuilder
      type='add'
      buttonTitle='افزودن پالت'
      schema={colorSchema}
      form={formRef.current}
      onSubmit={onSubmit}>
      <FormInput
        form={formRef.current}
        name='name'
        label='نام پالت'
        placeholder='نام پالت'
      />
      <FormControllerLayout className='py-0 mb-0 mt-1'>
        <ColorInput
          name='background'
          label='رنگ پس‌زمینه'
          placeholder='#ffffff'
          value={initialValues.background}
          onChange={onColorChange}
        />
        <ColorInput
          name='foreground'
          label='رنگ پیش‌زمینه'
          placeholder='#000000'
          value={initialValues.foreground}
          onChange={onColorChange}
        />
      </FormControllerLayout>

      <FormControllerLayout>
        <ColorInput
          name='primary'
          label='رنگ اصلی'
          placeholder='#000000'
          value={initialValues.primary}
          onChange={onColorChange}
        />
        <ColorInput
          name='primaryForeground'
          label='رنگ پیش‌زمینه اصلی'
          placeholder='#ffffff'
          value={initialValues.primary_foreground}
          onChange={onColorChange}
        />
      </FormControllerLayout>
    </FormBuilder>
  );
};
