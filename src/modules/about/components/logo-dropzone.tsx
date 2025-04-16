import { Controller, useForm } from 'react-hook-form';
import { FormBuilder } from '@/common/components/form-builder';
import DropZone from '@/common/components/file-drop-zone';

interface LogoForm {
  image: string[];
}

export function LogoDropzone() {
  const form = useForm<LogoForm>({
    defaultValues: {
      image: [],
    },
  });

  const onSubmit = (data: LogoForm) => {
    console.log(data);
  };

  return (
    <FormBuilder
      form={form}
      type='add'
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
    </FormBuilder>
  );
}
