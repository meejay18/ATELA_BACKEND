import { env } from '../CONFIG/env'
import { resendEmailService } from './resend/resendEmailService'
import { smtpEmailService } from './smtp/smtpService'

export const emailService = {
  send: async (input: { to: string; subject: string; html: string }) => {
    if (env.EMAIL_PROVIDER === 'resend') {
      return resendEmailService(input)
    }

    return smtpEmailService(input)
  },
}
