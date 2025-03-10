import * as z from "zod";

const nameLimitaion = () => {
  return z
    .string()
    .min(2, {
      message: "inputs.errors.name.min", // translation error object
    })
    .max(25, { message: "inputs.errors.name.max" });
};

export const aboutValidateSchema = z.object({
  about: z.object({
    fa: nameLimitaion(),
    en: nameLimitaion(),
    ar: nameLimitaion(),
    fr: nameLimitaion(),
  }),
});
