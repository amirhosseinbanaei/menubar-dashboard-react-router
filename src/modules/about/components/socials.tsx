// import { useFieldArray, useForm } from 'react-hook-form';
// import { FormBuilder } from '@/common/components/form-builder';
// import { Button } from '@/common/components/ui/button';
// import { FormInput, FormSelect } from '@/common/components/form-fields';
// import { XMarkIcon } from '@heroicons/react/24/outline';
// import { useEffect } from 'react';
// import { SocialResponse } from '@/modules/restaurant/interface/restaurant.interface';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import { FormButton } from '@/common/components/f-button';

// interface SocialForm {
//   socials: {
//     platform: string;
//     url: string;
//   }[];
// }

// const socialSchema = z.object({
//   socials: z.array(
//     z.object({
//       platform: z.string().nonempty('پلتفرم الزامی است'),
//       url: z
//         .string()
//         .nonempty('لینک یا شماره الزامی است')
//         .url('لینک معتبر وارد کنید')
//         .or(z.string().regex(/^\+?\d+$/, 'لینک یا شماره نامعتبر است')),
//     }),
//   ),
// });

// export type SocialFormValues = z.infer<typeof socialSchema>;

// const socials = [
//   { label: 'Instagram', value: 'instagram' },
//   { label: 'Phone', value: 'phone' },
//   { label: 'Google Map', value: 'googlemap' },
//   { label: 'Waze', value: 'waze' },
//   { label: 'Neshan', value: 'neshan' },
//   { label: 'Balad', value: 'balad' },
// ];

// export function Socials({
//   initialValues,
// }: {
//   initialValues?: SocialResponse[];
// }) {
//   const form = useForm<SocialFormValues>({
//     resolver: zodResolver(socialSchema),
//     defaultValues: {
//       socials: [{ platform: '', url: '' }],
//     },
//     mode: 'onChange',
//   });

//   const { fields, append, remove } = useFieldArray({
//     control: form.control,
//     name: 'socials',
//   });

//   const watchSocials = form.watch('socials');

//   useEffect(() => {
//     if (initialValues?.length) {
//       form.reset({ socials: initialValues });
//     }
//   }, [initialValues, form]);

//   const onSubmit = (data: SocialForm) => {
//     console.log(data);
//   };

//   return (
//     <FormBuilder
//       form={form}
//       type='edit'
//       schema={socialSchema}
//       onSubmit={onSubmit}>
//       {fields.map((field, index) => {
//         const currentPlatform = watchSocials?.[index]?.platform;
//         const label = currentPlatform === 'phone' ? 'شماره تماس' : 'لینک';

//         return (
//           <div
//             key={field.id}
//             className='w-full flex items-center gap-5 mb-8'>
//             <div className='w-[calc(100%-36px)] grid grid-cols-2 gap-5'>
//               <FormSelect
//                 form={form}
//                 name={`socials.${index}.platform`}
//                 label='شبکه اجتماعی'
//                 options={socials}
//               />
//               <FormInput
//                 type='text'
//                 name={`socials.${index}.url`}
//                 label={label}
//                 form={form}
//               />
//             </div>

//             {fields.length > 1 && (
//               <Button
//                 type='button'
//                 variant='outline-icon'
//                 size='icon'
//                 className='border-destructive mt-8'
//                 onClick={() => remove(index)}>
//                 <XMarkIcon className='text-destructive size-5' />
//               </Button>
//             )}
//           </div>
//         );
//       })}

//       {fields.length < 6 && (
//         <div className='flex gap-4 my-5 justify-end'>
//           <Button
//             type='button'
//             variant='outline'
//             onClick={() => append({ platform: '', url: '' })}>
//             افزودن فیلد
//           </Button>
//           <FormButton
//             formState={form.formState}
//             action='edit'
//             title='اعمال تغییرات'
//             onClick={(e) => console.log(e)}
//           />
//         </div>
//       )}
//     </FormBuilder>
//   );
// }

import { memo, useEffect, useMemo } from 'react';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { FormBuilder } from '@/common/components/form-builder';
import { Button } from '@/common/components/ui/button';
import { FormInput, FormSelect } from '@/common/components/form-fields';
import { FormButton } from '@/common/components/f-button';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { SocialResponse } from '@/modules/restaurant/interface/restaurant.interface';
import { Form } from '@/common/components/ui';

const socialsOptions = [
  { label: 'Instagram', value: 'instagram' },
  { label: 'Phone', value: 'phone' },
  { label: 'Google Map', value: 'googlemap' },
  { label: 'Waze', value: 'waze' },
  { label: 'Neshan', value: 'neshan' },
  { label: 'Balad', value: 'balad' },
];

const socialSchema = z.object({
  socials: z
    .array(
      z.object({
        platform: z.string().nonempty('پلتفرم الزامی است'),
        url: z
          .string()
          .nonempty('لینک یا شماره الزامی است')
          .url('لینک معتبر وارد کنید')
          .or(z.string().regex(/^\+?\d+$/, 'لینک یا شماره نامعتبر است')),
      }),
    )
    .min(1, 'حداقل یک فیلد لازم است'),
});

type SocialFormValues = z.infer<typeof socialSchema>;

interface SocialsProps {
  initialValues?: SocialResponse[];
}

export function Socials({ initialValues }: SocialsProps) {
  const defaultValues = useMemo<SocialFormValues>(
    () => ({
      socials: initialValues?.length
        ? initialValues
        : [{ platform: '', url: '' }],
    }),
    [initialValues],
  );

  const form = useForm<SocialFormValues>({
    resolver: zodResolver(socialSchema),
    defaultValues,
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'socials',
  });

  // const watchSocials = useWatch({
  //   control: form.control,
  //   name: 'socials',
  // });

  useEffect(() => {
    if (initialValues?.length) {
      const hasChanged =
        JSON.stringify(initialValues) !==
        JSON.stringify(form.getValues('socials'));

      if (hasChanged) {
        form.reset({ socials: initialValues });
      }
    }
  }, [initialValues]);

  const onSubmit = (data: SocialFormValues) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {fields.map((field, index) => {
          const label = 'لینک';
          return (
            <div
              key={field.id}
              className='w-full flex items-center gap-5 mb-8'>
              <div className='w-[calc(100%-36px)] grid grid-cols-2 gap-5'>
                <FormSelect
                  form={form}
                  name={`socials.${index}.platform`}
                  label='شبکه اجتماعی'
                  options={socialsOptions}
                />
                <FormInput
                  type='text'
                  name={`socials.${index}.url`}
                  label={label}
                  form={form}
                />
              </div>

              {fields.length > 1 && (
                <Button
                  type='button'
                  variant='outline-icon'
                  size='icon'
                  className='border-destructive mt-8'
                  onClick={() => remove(index)}>
                  <XMarkIcon className='text-destructive size-5' />
                </Button>
              )}
            </div>
          );
        })}

        <div className='flex gap-4 my-5 justify-end'>
          {fields.length < 6 && (
            <Button
              type='button'
              variant='outline'
              onClick={() => append({ platform: '', url: '' })}>
              افزودن فیلد
            </Button>
          )}
          <FormButton
            formState={form.formState}
            action='edit'
            title='اعمال تغییرات'
            onClick={(e) => console.log(e)}
          />
        </div>
      </form>
    </Form>
  );
}
