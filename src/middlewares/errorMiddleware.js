import { ZodError } from "zod";

export const errorHandler = (err, req, res, next) => {
  console.error("🔥 Error caught:", err);

  // Zod Validation Error
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

  // If error is a plain object 
  if (typeof err === "object" && !("statusCode" in err) && !(err instanceof Error)) {
    return res.status(400).json({
      success: false,
      type: "custom",
      error: err,
    });
  }

  // If error is { statusCode, message }
  if (err && err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      type: err.type || "custom",
      message: err.message || "Something went wrong",
      details: err.details || null,
    });
  }

  // new Error
  if (err instanceof Error) {
    return res.status(400).json({
      success: false,
      type: err.name || "error",
      message: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }

  // Fallback
  return res.status(500).json({
    success: false,
    type: "server",
    message: "Internal Server Error",
  });
};
