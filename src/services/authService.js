import User from "../models/User.js";
import generateToken  from "../utils/generateToken.js";

export const signupUser = async (email, password) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error("Email is already registered");
  }

  const newUser = await User.create({ email, password });

  return {
    message: "User created successfully",
    email: newUser.email,
  };
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    throw new Error("Your email or password is not correct");
  }

  return {
    message: "User logged in successfully",
    _id: user._id,
    email: user.email,
    token: generateToken(user._id),
  };
};
