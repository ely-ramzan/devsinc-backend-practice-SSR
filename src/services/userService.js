import User from "../models/User.js";

export const updateMyProfile = async (userId, obj) => {
  const user = await User.findByIdAndUpdate(userId, obj, {
    new: true,
    runValidators: true,
  }).select("-password");
  return {
    message: "User successfully updated",
    user: user,
  };
};

export const getMyProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");
  return {
    message: "User ",
    user: user,
  };
};
