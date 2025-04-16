import { z } from 'zod';

export const subcategoryFormSchema = z.object({
  translations: z
    .array(
      z.object({
        language: z.string(),
        name: z.string().min(2, 'نام زیر دسته الزامی است'),
      }),
    )
    .min(1, 'حداقل یک ترجمه الزامی است'),
});
