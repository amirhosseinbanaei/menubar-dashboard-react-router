import { UseFormReturn } from 'react-hook-form';
import { Button } from './ui';
import { z } from 'zod';
import React, { BaseSyntheticEvent } from 'react';

interface FormButtonProps<TFormSchema extends z.ZodType> {
  title: string;
  buttonAction: (e: BaseSyntheticEvent) => void;
  form: UseFormReturn<z.infer<TFormSchema>>;
  actionType: 'add' | 'edit';
  type?: 'button' | 'submit' | 'reset';
}

export function FormButton<TFormSchema extends z.ZodType>({
  form,
  buttonAction,
  type = 'submit',
  title,
  actionType,
  ...props
}: React.ComponentProps<'button'> & FormButtonProps<TFormSchema>) {
  return (
    <Button
      type={type}
      variant='primary'
      onClick={(e) => buttonAction(e)}
      disabled={
        !form.formState.isValid ||
        form.formState.isSubmitting ||
        (actionType === 'edit' && !form.formState.isDirty)
      }
      className={`${
        (form.formState.isSubmitting || !form.formState.isValid) && 'opacity-75'
      }`}
      {...props}>
      {title}
    </Button>
  );
}

export function AddToFormButton<TFormSchema extends z.ZodType>({
  form,
  buttonAction,
  type = 'submit',
  ...props
}: React.ComponentProps<'button'> & 
   Pick<FormButtonProps<TFormSchema>, 'form' | 'buttonAction' | 'type'>) {
  return (
    <FormButton
      form={form}
      buttonAction={buttonAction}
      type={type}
      title='افزودن'
      actionType='add'
      {...props}
    />
  );
}

export function EditFormButton<TFormSchema extends z.ZodType>({
  form,
  buttonAction,
  type = 'submit',
  ...props
}: Omit<
  React.ComponentProps<'button'> &
    Omit<FormButtonProps<TFormSchema>, 'title' | 'actionType'>,
  'title' | 'actionType'
>) {
  return (
    <FormButton
      form={form}
      buttonAction={buttonAction}
      type={type}
      title='ویرایش'
      actionType='edit'
      {...props}
    />
  );
}
