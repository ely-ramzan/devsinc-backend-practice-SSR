import crypto from "crypto";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { sendVerificationEmail } from "./emailService.js";

export const signupUser = async (email, password) => {
  let user = await User.findOne({ email });

  if (user && user.isVerified) {
    throw new Error("This email is already registered.");
  }

  if (user && !user.isVerified) {
    user.password = password;
  } else {
    user = new User({ email, password });
  }
  
  const verificationToken = user.generateEmailVerificationToken();
  await user.save();
  
  await sendVerificationEmail(user, verificationToken);

  return {
    message: "Registration successful! Please check your email to verify your account.",
  };
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    throw new Error("Invalid email or password");
  }

  if (!user.isVerified) {
    const unverifiedError = new Error("Your account has not been verified. Please check your email.");
    unverifiedError.code = 'ACCOUNT_NOT_VERIFIED';
    throw unverifiedError;
  }

  return {
    message: "User logged in successfully",
    _id: user._id,
    email: user.email,
    token: generateToken(user._id, user.email),
  };
};

export const verifyUserEmail = async (token) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new Error("Token is invalid or has expired.");
  }

  user.isVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationTokenExpires = undefined;
  await user.save();

  return { message: "Email verified successfully! You can now log in." };
};

export const resendVerificationEmail = async (email) => {
    const user = await User.findOne({ email });
  
    if (!user) {
      throw new Error("If an account with that email exists, a verification link has been sent.");
    }
  
    if (user.isVerified) {
      throw new Error("This account has already been verified.");
    }
  
    const verificationToken = user.generateEmailVerificationToken();
    await user.save();
  
    await sendVerificationEmail(user, verificationToken);
  
    return { message: "A new verification email has been sent." };
};