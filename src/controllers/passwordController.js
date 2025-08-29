import { forgotPassword, resetPassword } from "../services/passwordService.js";

export const forgotPasswordHandler = async (req, res, next) => {
    try {
        const { email } = req.body;
        const result = await forgotPassword(email);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

export const resetPasswordHandler = async (req, res, next) => {
    try {
        const { token } = req.query;
        const { password } = req.body;
        const result = await resetPassword(token, password);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

