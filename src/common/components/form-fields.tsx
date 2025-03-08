import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '../ui/select';
import { UseFormReturn } from 'react-hook-form';
import { Path } from 'react-hook-form';
import { z } from 'zod';

interface FormInputProps<TFormSchema extends z.ZodType> {
  form: UseFormReturn<z.infer<TFormSchema>>;
  name: Path<z.infer<TFormSchema>>;
  label: string;
  placeholder?: string;
  type?: string;
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
          <FormLabel className='block tracking-none font-medium mb-2 mx-1 text-sm text-typography-500'>
            {label}
          </FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
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
// interface FormSelectProps<TFormSchema extends z.ZodType> {
//   form: UseFormReturn<z.infer<TFormSchema>>;
//   name: Path<z.infer<TFormSchema>>;
//   label: string;
//   placeholder?: string;
//   options: Array<{
//     value: string;
//     label: string;
//   }>;
// }

// function FormSelect<TFormSchema extends z.ZodType>({
//   form,
//   name,
//   label,
//   placeholder,
//   options,
// }: FormSelectProps<TFormSchema>) {
//   return (
//     <FormField
//       control={form.control}
//       name={name}
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel className='block tracking-none font-medium mb-2 mx-1 text-sm text-typography-500'>
//             {label}
//           </FormLabel>
//           <Select onValueChange={field.onChange} defaultValue={field.value}>
//             <FormControl>
//               <SelectTrigger>
//                 <SelectValue placeholder={placeholder} />
//               </SelectTrigger>
//             </FormControl>
//             <SelectContent>
//               {options.map((option) => (
//                 <SelectItem key={option.value} value={option.value}>
//                   {option.label}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// }

export {
  FormInput,
  // FormSelect
};
