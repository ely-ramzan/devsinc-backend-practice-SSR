import nodemailer from "nodemailer";
import parsedConfig from "../configs/envConfig.js";

const { smtpHost, smtpPort, smtpUser, smtpPass, clientUrl } = parsedConfig;

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: false, 
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

const sendEmail = async (options) => {
  const mailOptions = {
    from: `"FlowTrack" <${smtpUser}>`,
    to: options.to,
    subject: options.subject,
    html: options.html,
  };
  await transporter.sendMail(mailOptions);
  console.log("Email sent successfully.");
};

export const sendVerificationEmail = async (user, token) => {
  const verificationUrl = `${clientUrl}/verify-email?token=${token}`;
  const html = `
    <h2>Hello ${user.email},</h2>
    <p>Thank you for registering with FlowTrack! Please click the link below to verify your account. This link will expire in 15 minutes.</p>
    <a href="${verificationUrl}" style="background-color: #7c3aed; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Your Account</a>
    <p>If you did not create an account, please disregard this email.</p>
  `;

  await sendEmail({
    to: user.email,
    subject: "FlowTrack - Account Verification",
    html,
  });
};

export const sendPasswordResetEmail = async (user, token) => {
    const resetUrl = `${clientUrl}/reset-password?token=${token}`;
    const html = `
      <h2>Hello ${user.email},</h2>
      <p>You are receiving this email because you (or someone else) have requested the reset of a password for your FlowTrack account. Please click the link below to reset your password. This link will expire in 10 minutes.</p>
      <a href="${resetUrl}" style="background-color: #7c3aed; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Your Password</a>
      <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
    `;
  
    await sendEmail({
      to: user.email,
      subject: "FlowTrack - Password Reset Request",
      html,
    });
  };