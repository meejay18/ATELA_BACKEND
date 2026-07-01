import { env } from "../../CONFIG/env" 

export const emailConfig = {
  apiKey: env.RESEND_API_KEY!,
  fromAddress: env.RESEND_EMAIL_FROM
}
