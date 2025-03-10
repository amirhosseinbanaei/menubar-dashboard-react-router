import * as z from "zod";

const nameLimitaion = () => {
  // translation error object
  return z
    .string()
    .min(2, { message: "inputs.errors.name.min" })
    .max(25, { message: "inputs.errors.name.max" });
};

const itemDescriptionLimitaion = () => {
  // translation error object
  return z.string().min(2, { message: "inputs.errors.itemDescription.min" });
};

export const itemValidateSchema = z.object({
  _id: z.string().optional(),
  name: z.object({
    fa: nameLimitaion(),
    en: nameLimitaion(),
    ar: nameLimitaion(),
  }),
  itemDescription: z.object({
    fa: itemDescriptionLimitaion(),
    en: itemDescriptionLimitaion(),
    ar: itemDescriptionLimitaion(),
  }),
  image: z.string() || z.instanceof(File),
  category: z.string(),
  subCategory: z.string().or(z.literal(" ")),
  order: z.number(),
  price: z
    .string()
    .pipe(
      z.coerce.number({ errorMap: () => ({ message: "inputs.errors.price" }) }),
    ),
  discount:
    z.coerce
      .number({
        errorMap: () => ({ message: "inputs.errors.discount.string" }),
      })
      .min(0, { message: "inputs.errors.discount.min" })
      .max(100, { message: "inputs.errors.discount.max" }) || z.undefined(),
  unit: z.string(),
  isAvailable: z.boolean(),
  isHidden: z.boolean(),
  tags: z.string().array(),
  extraItems: z.string().array() ||
    z.object({ id: z.string(), name: z.string() }).array(),
});
