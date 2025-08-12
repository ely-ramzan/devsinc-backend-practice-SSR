import { z } from "zod";

const categoryEnum = z.enum(["expense", "income"]);

export const catSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "SubCategory should have a proper name" })
    .toLowerCase()
    .transform((val) => val.normalize()),
  category: z
    .string()
    .trim()
    .toLowerCase()
    .transform((val) => val.normalize())
    .refine((val) => categoryEnum.options.includes(val), {
      message: "Category must be either 'expense' or 'income'",
    })
});


export const catQueryParams = z.object({
    id: z.uuid(),
    category: categoryEnum.optional(),
    name: z.string().trim().optional(),
}).partial();
