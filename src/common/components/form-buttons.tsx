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

// import React, { BaseSyntheticEvent } from 'react';
// import { UseFormReturn } from 'react-hook-form';
// import { z, ZodType, ZodTypeDef } from 'zod';
// import { Button } from './ui';

// type ActionType = 'add' | 'edit';

// interface FormButtonProps<
//   TSchema extends ZodType<unknown, ZodTypeDef, unknown>,
// > {
//   title: string;
//   form: UseFormReturn<z.infer<TSchema>>;
//   buttonAction: (e: BaseSyntheticEvent) => void;
//   actionType: ActionType;
//   type?: 'button' | 'submit' | 'reset';
// }

// export function FormButton<
//   TSchema extends ZodType<unknown, ZodTypeDef, unknown>,
// >({
//   form,
//   title,
//   type = 'submit',
//   buttonAction,
//   actionType,
//   ...rest
// }: React.ComponentProps<'button'> & FormButtonProps<TSchema>) {
//   const { isValid, isSubmitting, isDirty } = form.formState;

//   const isDisabled =
//     !isValid || isSubmitting || (actionType === 'edit' && !isDirty);

//   return (
//     <Button
//       type={type}
//       variant='primary'
//       onClick={buttonAction}
//       disabled={isDisabled}
//       className={isDisabled ? 'opacity-75' : ''}
//       {...rest}>
//       {title}
//     </Button>
//   );
// }

// export function AddToFormButton<
//   TSchema extends ZodType<unknown, ZodTypeDef, unknown>,
// >({
//   form,
//   buttonAction,
//   type = 'submit',
//   ...rest
// }: Omit<FormButtonProps<TSchema>, 'title' | 'actionType'> &
//   React.ComponentProps<'button'>) {
//   return (
//     <FormButton
//       form={form}
//       buttonAction={buttonAction}
//       title='افزودن'
//       actionType='add'
//       type={type}
//       {...rest}
//     />
//   );
// }

// export function EditFormButton<
//   TSchema extends ZodType<unknown, ZodTypeDef, unknown>,
// >({
//   form,
//   buttonAction,
//   type = 'submit',
//   ...rest
// }: Omit<FormButtonProps<TSchema>, 'title' | 'actionType'> &
//   React.ComponentProps<'button'>) {
//   return (
//     <FormButton
//       form={form}
//       buttonAction={buttonAction}
//       title='ویرایش'
//       actionType='edit'
//       type={type}
//       {...rest}
//     />
//   );
// }
