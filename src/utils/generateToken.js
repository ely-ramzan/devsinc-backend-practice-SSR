import jwt from "jsonwebtoken";
import config from "../configs/envConfig.js";

const generateToken = (id,email,expiresIn = '7d') => {
  const privateKey = config.privateKey;
  try {
    const token = jwt.sign({ _id: id,email:email }, privateKey, { expiresIn: expiresIn });
    return token;
  } catch (err) {
    throw new Error("Error creating token", err);
  }
};

export default generateToken;
