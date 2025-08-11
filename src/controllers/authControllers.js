const User = require("../models/User");
const generateToken = require('../utils/generateToken');

const signupController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ message: "Email is already registered" });
    }
    const uploadUser = await User.create({
      email: email,
      password: password,
    });
    return res
      .status(200)
      .json({
        message: "User created Successfully",
        email: uploadUser.email
      });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Error while creating user: ${err}` });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Enter your email and password" });
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user || !(await user.matchPassword(password))) {
      return res
        .status(400)
        .json({ message: "Your email or password is not correct" })
    }
    res.status(200).json({
            message: "User logged in successfully",
            _id: user._id,
            email: user.email,
            token: generateToken(user._id)
        });
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Error while creating user: ${err}` });
  }
};

module.exports = {
  signupController,
  loginController,
};
