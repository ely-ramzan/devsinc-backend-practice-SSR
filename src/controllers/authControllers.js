import { signupUser, loginUser, singUpVerification } from "../services/authService.js";

export const signupHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await signupUser(email, password);
    await singUpVerification(result._id,email);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export const loginHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
