const validateMiddleware = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body); 
    next();
  } catch (error) {
    next(error);
  }
};

export { validateMiddleware };
