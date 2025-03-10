import * as z from "zod";

const nameLimitaion = () => {
  // translation error object
  return z
    .string()
    .min(2, { message: "inputs.errors.name.min" })
    .max(25, { message: "inputs.errors.name.max" });
};

export const extraItemValidateSchema = z.object({
  _id: z.string().optional(),
  name: z.object({
    fa: nameLimitaion(),
    en: nameLimitaion(),
    ar: nameLimitaion(),
  }),
  price: z
    .string()
    .pipe(
      z.coerce.number({ errorMap: () => ({ message: "inputs.errors.price" }) }),
    ),
  unit: z.string()
});
