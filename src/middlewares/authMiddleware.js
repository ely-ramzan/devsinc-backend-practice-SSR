import jwt from "jsonwebtoken";
import parsedConfig from "../configs/envConfig.js";

export const authMiddleware = (req, res, next) => {
  const { privateKey } = parsedConfig;
  try {
    const authHeader = req?.headers?.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Authorization token missing or invalid");
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, privateKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }

      req.user = decoded;
      next();
    });
  } catch (err) {
    next(err);
  }
};
