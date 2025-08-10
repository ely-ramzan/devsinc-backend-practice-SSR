const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  const privateKey = process.env.JWT_KEY;
  try {
    const token = jwt.sign({ id: id }, privateKey, { expiresIn: "7d" });
    return token;
  } catch (err) {
    throw new Error("Error creating token", err);
  }
};

module.exports = generateToken;