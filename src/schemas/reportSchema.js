import { z } from "zod";

/**
 * Zod schema to validate the OPTIONAL query parameters for the report download.
 * If provided, it transforms date strings into valid JavaScript Date objects.
 */
export const reportQuerySchema = z.object({
  startDate: z.string().transform((str) => new Date(str)).optional(),
  endDate: z.string().transform((str) => new Date(str)).optional(),
});