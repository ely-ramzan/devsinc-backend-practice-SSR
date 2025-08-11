import dotenv from "dotenv";
dotenv.config();
const url = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
const privateKey = process.env.JWT_KEY;
export { url, port, privateKey };
