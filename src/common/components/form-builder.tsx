import { Button } from './ui/button';
import { Form } from './ui/form';
import { UseFormReturn } from 'react-hook-form';
import { ReactNode } from 'react';
import { z } from 'zod';
// import { DevTool } from '@hookform/devtools';

interface FormBuilderProps<TFormSchema extends z.ZodType> {
  form: UseFormReturn<z.infer<TFormSchema>>;
  onSubmit: (
    // form: UseFormReturn<z.infer<TFormSchema>>,
    data: z.infer<TFormSchema>,
  ) => void;
  children: ReactNode;
  buttonTitle?: string;
  schema: TFormSchema;
}

export function FormBuilder<TFormSchema extends z.ZodType>({
  form,
  onSubmit,
  children,
  buttonTitle,
  schema,
}: FormBuilderProps<TFormSchema>) {
  const handleSubmit = async (data: z.infer<TFormSchema>) => {
    const validatedData = await schema.parseAsync(data);
    return onSubmit(validatedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        {children}
        {buttonTitle && (
          <div className='w-full h-auto flex flex-col items-end my-5'>
            <Button
              type='submit'
              variant='primary'
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              className={`${
                (form.formState.isSubmitting || !form.formState.isValid) &&
                'opacity-75'
              }`}>
              {buttonTitle}
            </Button>
          </div>
        )}
        {/* <DevTool control={form.control} /> */}
      </form>
    </Form>
  );
}
