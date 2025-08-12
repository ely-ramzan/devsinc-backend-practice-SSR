import { safeParse } from "zod";

export const validateQueryParams = (schema) => (req, res, next) => {
  try {
    const result = schema.safeParse(req.query);
    req.validatedQuery = result.success ? result.date : {};
    if (req.validatedQuery == {} || !req.validatedQuery) {
      throw new Error("no query params");
    }
    next();
  } catch (err) {
    next(err);
  }
};
