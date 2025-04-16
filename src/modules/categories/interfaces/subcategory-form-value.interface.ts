import { z } from "zod";
import { subcategoryFormSchema } from "../schemas/subcategory-form.schema";

export type SubcategoryFormValues = z.infer<typeof subcategoryFormSchema>;