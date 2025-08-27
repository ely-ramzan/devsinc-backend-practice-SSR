import User from "../models/User.js";

export const updateMyProfile = async (userId, updateData) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found.");
  }
  Object.assign(user, updateData);
  await user.save();
  const updatedUser = await User.findById(userId).select("-password");
  return {
    message: "User successfully updated",
    user: updatedUser,
  };
};

export const getMyProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");
  return {
    message: "User Profile Fetched", 
    user: user,
  };
};