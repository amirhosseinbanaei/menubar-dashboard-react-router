import { z } from 'zod';

export const translationSchema = z.object({
  languageCode: z.string().max(2),
  name: z.string().min(2, 'Name is required'),
  description: z.string().optional(),
});
