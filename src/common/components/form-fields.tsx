import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

import { UseFormReturn } from 'react-hook-form';
import { Path } from 'react-hook-form';
import { z } from 'zod';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { useLanguageStore } from '../stores/language.store';
import React, { ReactNode } from 'react';
import { cn } from '../lib/utils';

interface FormInputProps<TFormSchema extends z.ZodType> {
  form: UseFormReturn<z.infer<TFormSchema>>;
  name: Path<z.infer<TFormSchema>>;
  label?: string;
  placeholder?: string;
  type?: string;
  inputProps?: React.ComponentProps<'input'>;
}

function FormInput<TFormSchema extends z.ZodType>({
  form,
  name,
  label,
  placeholder,
  type = 'text',
}: FormInputProps<TFormSchema>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className='block tracking-none font-medium mb-3 mx-1 text-sm text-text-light'>
            {label}
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              className='placeholder:text-text-light'
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function FormTextarea<TFormSchema extends z.ZodType>({
  form,
  name,
  label,
  placeholder,
  className,
}: FormInputProps<TFormSchema> & { className?: string }) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className='block tracking-none font-medium mb-3 mx-1 text-sm text-text-light'>
            {label}
          </FormLabel>
          <FormControl>
            <textarea
              placeholder={placeholder}
              className={cn(
                'text-text placeholder:text-text-light my-2 block h-20 w-full resize-none rounded-sm border border-gray-200 bg-white px-5 py-3 text-sm leading-7 placeholder:text-sm focus:outline-primary focus:ring-0',
                className,
              )}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// Example of a Select field with Zod
interface FormSelectProps<TFormSchema extends z.ZodType> {
  form: UseFormReturn<z.infer<TFormSchema>>;
  name: Path<z.infer<TFormSchema>>;
  label: string;
  placeholder?: string;
  options: Array<{
    value: string;
    label: string;
  }>;
  defaultValue?: string;
  customSelectItem?: ReactNode;
}

function FormSelect<TFormSchema extends z.ZodType>({
  form,
  name,
  label,
  placeholder,
  options,
  defaultValue,
  customSelectItem,
}: FormSelectProps<TFormSchema>) {
  if (!options || options.length < 1) return null;
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel className='block tracking-none font-medium mb-3 mx-1 text-sm text-text-light'>
              {label}
            </FormLabel>
            <Select
              onValueChange={field.onChange}
              {...(!defaultValue && { value: field.value })}
              {...(defaultValue && { defaultValue: defaultValue })}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {customSelectItem}
                {options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={`${option.value}`}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

export function FormSwitch<TFormSchema extends z.ZodType>({
  form,
  name,
  label,
}: {
  form: UseFormReturn<z.infer<TFormSchema>>;
  name: Path<z.infer<TFormSchema>>;
  label: string;
}) {
  const dir = useLanguageStore((state) => state.direction);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex items-center'>
          <FormControl>
            <div className='flex items-center gap-3'>
              <Label className='font-medium text-text-light'>{label}</Label>
              <Switch
                // value={field.value}
                checked={field.value}
                onCheckedChange={field.onChange}
                dir={dir === 'ltr' ? 'rtl' : 'ltr'}
                {...field}
              />
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export { FormTextarea, FormInput, FormSelect };
