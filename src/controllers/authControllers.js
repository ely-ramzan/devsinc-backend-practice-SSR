import {
  signupUser,
  loginUser,
  verifyUserEmail,
  resendVerificationEmail,
} from "../services/authService.js";
import parsedConfig from "../configs/envConfig.js";
const { clientUrl } = parsedConfig;
export const signupHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await signupUser(email, password);
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

export const verifyEmailHandler = async (req, res, next) => {
  try {
    const { token } = req.query;
    await verifyUserEmail(token);
    console.log("email verified");
    res.redirect(clientUrl + "/email-verified");
  } catch (err) {
    res.redirect(clientUrl + "/verification-failed");
  }
};

export const resendVerificationHandler = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await resendVerificationEmail(email);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
