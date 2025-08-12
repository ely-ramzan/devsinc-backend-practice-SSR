import jwt from "jsonwebtoken";
import User from "../models/User.js";
import parsedConfig from "../configs/envConfig.js";

export const handleVerification = async (req, res, next) => {
  const { privateKey } = parsedConfig;
  const { token } = req.params;
  console.log(token);
  console.log(privateKey);

  try {
    const decoded = jwt.verify(token, privateKey);
    console.log(decoded.id);
    const user = await User.findById(decoded._id);

    if (!user) throw new Error("User not found");
    if (user.isVerified) throw new Error("User already verified");

    user.isVerified = true;
    await user.save();

    res.send("Email verified successfully! You can now log in.");
  } catch (err) {
    next(err);
  }
};
