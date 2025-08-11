import { ZodError } from "zod";

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof ZodError) {
    const formattedErrors = err.errors?.length
      ? err.errors.map((e) => ({
          path: Array.isArray(e.path) ? e.path.join(".") : String(e.path || ""),
          message: e.message || "Invalid input",
        }))
      : [
          {
            path: "",
            message: "Invalid input. Please check your data and try again.",
          },
        ];

    return res.status(400).json({
      success: false,
      type: "validation",
      errors: formattedErrors,
    });
  }

  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message || "Something went wrong",
    });
  }

  if (err.name === "ValidationError" && err.errors) {
    return res.status(400).json({
      success: false,
      type: "mongoose-validation",
      errors: Object.values(err.errors).map((e) => ({
        path: e.path,
        message: e.message,
      })),
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};
