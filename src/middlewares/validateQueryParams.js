import { safeParse } from "zod";

export const validateQueryParams = (schema) => (req, res, next) => {
  try {
    console.log("req.query",req.query);
    
    if (!req.query || Object.keys(req.query).length === 0) {
      throw new Error("No query parameters provided");
    }

    const result = schema.safeParse(req.query);

    if(Object.keys(result.data).length === 0){
      throw new Error("Query parameters are invalid.");
    }
    console.log("result",result);
    
    if (!result.success) {
      throw new Error({ error: result.error.errors });
    }

    req.validatedQuery = result.data;
    next();
  } catch (err) {
    next(err);
  }
};
