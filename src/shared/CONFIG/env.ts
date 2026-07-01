import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.string(),
  PORT: z.coerce.number(),
  DATABASE_URL: z.string(),
  API_BASE_URL: z.string(),
  // REDIS_URL: z.string(),
  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  JWT_ACCESS_EXPIRES: z.string(),
  JWT_REFRESH_EXPIRES: z.string(),
  APP_NAME: z.string(),
  EMAIL_FROM: z.string(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number(),
  SMTP_USER: z.string().email(),
  SMTP_PASS: z.string(),
  RESEND_API_KEY: z.string(),
  RESEND_EMAIL_FROM: z.string(),
  EMAIL_PROVIDER: z.string(),
})

export const env = envSchema.parse(process.env)
