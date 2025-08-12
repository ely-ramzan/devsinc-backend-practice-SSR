import dotenv from "dotenv";
import z from "zod";
dotenv.config();

const config = {
    node_env: process.env.NODE_ENV,
    url: process.env.MONGO_URI,
    port: process.env.PORT || 3000,
    privateKey: process.env.JWT_KEY,
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS
}

const configSchema = z.object({
    node_env : z.enum(['development', 'production', 'test']).default('development'),
    url: z.string({message: "URL is required"}),
    port: z.string().optional(),
    privateKey: z.string().min(9),
    smtpUser: z.string("Invalid email address"),
    smtpPass: z.string().min(8,{message: "Must be atleast 8 charachters long"})
})

const parsedConfig = configSchema.parse(config)

export default parsedConfig

