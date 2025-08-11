import jwt from "jsonwebtoken";
import config from "../configs/envConfig.js";

const generateToken = (id) => {
  const privateKey = config.privateKey;
  try {
    const token = jwt.sign({ id: id }, privateKey, { expiresIn: "7d" });
    return token;
  } catch (err) {
    throw new Error("Error creating token", err);
  }
};

export default generateToken;
