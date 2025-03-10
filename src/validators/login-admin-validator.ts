import * as z from "zod";

export const adminLoginValidateSchema = z.object({
  username: z.string().email(),
  password: z.string().min(8),
});
