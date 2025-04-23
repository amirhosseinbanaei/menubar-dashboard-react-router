import { FormState } from 'react-hook-form';
import { Button } from './ui';
import { z } from 'zod';
import React, { BaseSyntheticEvent } from 'react';

interface FormButtonProps<TFormSchema extends z.ZodType> {
  title: string;
  onClick: (e: BaseSyntheticEvent) => void;
  formState: FormState<z.infer<TFormSchema>>;
  action: 'add' | 'edit';
  type?: 'button' | 'submit' | 'reset';
}

export function FormButton<TFormSchema extends z.ZodType>({
  formState,
  onClick,
  type = 'submit',
  title,
  action,
  ...props
}: React.ComponentProps<'button'> & FormButtonProps<TFormSchema>) {
  return (
    <Button
      type={type}
      variant='primary'
      onClick={(e) => onClick(e)}
      disabled={
        !formState.isValid ||
        formState.isSubmitting ||
        (action === 'edit' && !formState.isDirty)
      }
      className={`${
        (formState.isSubmitting || !formState.isValid) && 'opacity-75'
      }`}
      {...props}>
      {title}
    </Button>
  );
}
