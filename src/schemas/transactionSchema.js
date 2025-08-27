import { z } from "zod";

const dateStringToDate = z.preprocess(
  (val) => (typeof val === "string" ? new Date(val) : val),
  z.date()
);

const categoryEnum = z.enum(["expense", "income"]);

export const transactionSchema = z.object({
  category: z
    .string()
    .trim()
    .toLowerCase()
    .refine((val) => categoryEnum.options.includes(val), {
      message: "Category must be either 'expense' or 'income'",
    }),
  subCategory: z
    .string()
    .trim()
    .min(2, { message: "SubCategory should have a proper name" })
    .toLowerCase(),
  amount: z
    .number({ invalid_type_error: "Amount must be a number" })
    .min(0, { message: "Amount can't be less than 0" }),
  notes: z
    .string()
    .trim()
    .min(3, { message: "Notes are too short" })
    .max(100, { message: "Notes are too long" })
    .nullable()
    .optional(),
  date: dateStringToDate.nullable().optional(),
});

export const updateTransactionSchema = transactionSchema.partial();

export const transactionQuerySchema = z
  .object({
    _id: z.string().trim().optional(),
    category: categoryEnum.optional(),
    subCategory: z.string().trim().optional(),
    date: dateStringToDate.optional(),
  })
  .partial();


  export const transactionListQuerySchema = z.object({
  // Filtering
  category: z.enum(["expense", "income"]).optional(),
  subCategory: z.string().trim().optional(),

  // Pagination
  page: z.string().transform(Number).optional().default("1"),
  limit: z.string().transform(Number).optional().default("10"),

  // Sorting
  sortBy: z.string().optional().default("date"), // Default sort field
  sortOrder: z.enum(["asc", "desc"]).optional().default("desc"), // Default sort order
});
  
