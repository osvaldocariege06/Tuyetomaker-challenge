import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().default(8080),
  JWT_SECRET: z.string(),
})

export const env = envSchema.parse(process.env)
