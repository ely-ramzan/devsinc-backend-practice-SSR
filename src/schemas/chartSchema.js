import { z } from "zod";

export const chartQuerySchema = z.object({
  startDate: z.string({ required_error: "startDate is required." })
    .transform((str, ctx) => {
      const date = new Date(str);
      if (isNaN(date.getTime())) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_date,
          message: "Invalid startDate format",
        });
        return z.NEVER;
      }
      return date;
    }),
  endDate: z.string({ required_error: "endDate is required." })
    .transform((str, ctx) => {
      const date = new Date(str);
      if (isNaN(date.getTime())) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_date,
          message: "Invalid endDate format",
        });
        return z.NEVER;
      }
      return date;
    }),
});