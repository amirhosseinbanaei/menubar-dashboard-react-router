import { Button } from './ui/button';
import { Form } from './ui/form';
import { UseFormReturn } from 'react-hook-form';
import { ReactNode } from 'react';
import { z } from 'zod';
import { DevTool } from '@hookform/devtools';

interface FormBuilderProps<TFormSchema extends z.ZodType> {
  form: UseFormReturn<z.infer<TFormSchema>>;
  onSubmit: (
    data: z.infer<TFormSchema>,
    form: UseFormReturn<z.infer<TFormSchema>>,
  ) => void;
  children: ReactNode;
  buttonTitle?: string;
  schema: TFormSchema;
  type: 'add' | 'edit';
  buttonType?: 'submit' | 'button';
}

export function FormBuilder<TFormSchema extends z.ZodType>({
  form,
  onSubmit,
  children,
  buttonTitle,
  schema,
  type,
  buttonType = 'submit',
}: FormBuilderProps<TFormSchema>) {
  const handleSubmit = async (data: z.infer<TFormSchema>) => {
    const validatedData = await schema.parseAsync(data);
    return onSubmit(validatedData, form);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        {children}
        {buttonTitle && (
          <div className='w-full h-auto flex flex-col items-end mt-8 mb-3'>
            <Button
              type={buttonType}
              variant='primary'
              disabled={
                !form.formState.isValid ||
                form.formState.isSubmitting ||
                (type === 'edit' && !form.formState.isDirty)
              }
              className={`${
                (form.formState.isSubmitting || !form.formState.isValid) &&
                'opacity-75'
              }`}>
              {buttonTitle}
            </Button>
          </div>
        )}
        <DevTool control={form.control} />
      </form>
    </Form>
  );
}
