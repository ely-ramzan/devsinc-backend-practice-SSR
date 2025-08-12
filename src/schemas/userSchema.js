import { email, z } from "zod";

export const updateUserSchema = z
  .object({
    firstName: z
      .string()
      .min(3, { message: "First Name should have at least 3 letters" })
      .optional(),
    lastName: z
      .string()
      .min(3, { message: "Last Name should have at least 3 letters" })
      .optional(),
    password: z
      .string()
      .trim()
      .nonempty({ message: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(64, { message: "Password must not exceed 64 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character",
      })
      .optional(),
      email: z.never()
  })
  .partial();
