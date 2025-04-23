import { z } from 'zod';

// Define color schema
export const colorSchema = z.object({
  name: z.string().min(1, 'نام پالت الزامی است'),
  background: z.string().min(1, 'رنگ پس‌زمینه الزامی است'),
  foreground: z.string().min(1, 'رنگ پیش‌زمینه الزامی است'),
  primary: z.string().min(1, 'رنگ اصلی الزامی است'),
  primary_foreground: z.string().min(1, 'رنگ پیش‌زمینه اصلی الزامی است'),
});

// Define type for color values
export type ColorFormValues = z.infer<typeof colorSchema>;

// Predefined color palettes
// export const PREDEFINED_PALETTES = [
//   {
//     title: 'کلاسیک',
//     colors: {
//       background: '#ffffff',
//       foreground: '#000000',
//       primary: '#000000',
//       primary_foreground: '#ffffff',
//     },
//   },
//   {
//     title: 'مدرن',
//     colors: {
//       background: '#f8f9fa',
//       foreground: '#212529',
//       primary: '#0d6efd',
//       primary_foreground: '#ffffff',
//     },
//   },
//   {
//     title: 'تیره',
//     colors: {
//       background: '#212529',
//       foreground: '#f8f9fa',
//       primary: '#0dcaf0',
//       primaryForeground: '#000000',
//     },
//   },
//   {
//     title: 'گرم',
//     colors: {
//       background: '#fff8f0',
//       foreground: '#4a3f35',
//       primary: '#ff7700',
//       primaryForeground: '#ffffff',
//     },
//   },
// ];
