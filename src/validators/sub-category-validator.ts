import * as z from "zod";

const nameLimitaion = () => {
  return z
    .string()
    .min(2, {
      message: "inputs.errors.subCategoryName.min", // translation error object
    })
    .max(25, { message: "inputs.errors.subCategoryName.max" });
};

export const subCategoryValidateSchema = z.object({
  name: z.object({
    fa: nameLimitaion(),
    en: nameLimitaion(),
    ar: nameLimitaion(),
  }),
  isNew: z.boolean()
});
