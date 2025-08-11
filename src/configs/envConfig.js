import dotenv from "dotenv";
import z from "zod";
dotenv.config();

const config = {
    url: process.env.MONGO_URI,
    port: process.env.PORT || 3000,
    privateKey: process.env.JWT_KEY
}

const configSchema = z.object({
    url: z.string({message: "URL is required"}),
    port: z.string().optional(),
    privateKey: z.string().min(9)
})

const parsedConfig = configSchema.parse(config)

export default parsedConfig