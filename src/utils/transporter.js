import parsedConfig from "../configs/envConfig.js";
const {smtpUser,smtpPass} = parsedConfig;
import { createTransport } from "nodemailer";

export const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
  user: smtpUser,
  pass: smtpPass,
}
});
