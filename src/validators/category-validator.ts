import * as z from "zod";

const nameLimitaion = () => {
  return z
    .string()
    .min(2, {
      message: "inputs.errors.name.min", // translation error object
    })
    .max(25, { message: "inputs.errors.name.max" });
};

export const categoryValidateSchema = z.object({
  name: z.object({
    fa: nameLimitaion(),
    en: nameLimitaion(),
    ar: nameLimitaion(),
  }),
  image: z.string() || z.instanceof(File),
  subCategory:
    z.any().array() ||
    z.tuple([
      z.object({
        id: z.string(),
        name: z.object({
          fa: nameLimitaion(),
          en: nameLimitaion(),
          ar: nameLimitaion(),
        }),
        isNew: z.boolean().optional(),
      }),
    ]),
  order: z.number(),
});
