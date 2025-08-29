import crypto from "crypto";
import User from "../models/User.js";
import { sendPasswordResetEmail } from "./emailService.js";

export const forgotPassword = async (email) => {
  const user = await User.findOne({ email });

  if (user) {
    const resetToken = user.generatePasswordResetToken();
    await user.save();
    try {
      await sendPasswordResetEmail(user, resetToken);
    } catch (error) {
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpires = undefined;
        await user.save();
        throw new Error("Email could not be sent. Please try again.");
    }
  }

  return { message: "If an account with that email exists, a password reset link has been sent." };
};

export const resetPassword = async (token, newPassword) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new Error("Token is invalid or has expired.");
  }

  user.password = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  await user.save();

  return { message: "Password has been reset successfully." };
};