import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import parsedConfig from "../configs/envConfig.js";
import { transporter } from "../utils/transporter.js";


const { port,smtpUser } = parsedConfig;
export const signupUser = async (email, password) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("Email is already registered");
  }

  const newUser = await User.create({ email, password });

  return {
    message: "User created successfully",
    email: newUser.email,
    _id: newUser._id
  };
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  
  if (!user || !(await user.matchPassword(password)) || !user.isVerified) {
    throw new Error("Your email or password is not correct or User isn't verified");
  }

  return {
    message: "User logged in successfully",
    _id: user._id,
    email: user.email,
    token: generateToken(user._id,user.email),
  };
};

export const singUpVerification = async (id,email) => {
  const token = generateToken(id,email, "1h");
  const verifyUrl = `http://localhost:${port}/verify/${token}`; /////.env
  await transporter.sendMail({
    from: `"My App" <${smtpUser}>`,
    to: email,
    subject: "Verify your email",
    html: `<h2>Hello ${smtpUser}</h2>
           <p>Please click the link below to verify your account:</p>
           <a href="${verifyUrl}">Verify Email</a>`,
  }); /// helper to give structured email in email service
};

