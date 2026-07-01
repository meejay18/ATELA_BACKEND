import { resendClient } from './resendEmailClient'
import { emailConfig } from './resendEmailConfig'
import { sendEmailInput } from './resendEmailTypes'
import { logger } from '../../LOGGER'
import { env } from '../../CONFIG/env'

export const resendEmailService = async (input: sendEmailInput): Promise<void> => {
  try {
    const { data, error } = await resendClient.emails.send({
      from: emailConfig.fromAddress,
      to: input.to,
      subject: input.subject,
      html: input.html,
    })

    if (error) {
      logger.error({ error, to: input.to }, 'Resend send failed')
      throw new Error(`email send failed: ${error.message}`)
    }

    logger.info({ id: data?.id, to: input.to }, 'Email sent')
  } catch (error: any) {
    logger.error({ error }, 'Email service error')
    throw error
  }
}

// if (emailConfig.devOnly && input.to !== process.env.RESEND_DEV_TEST_EMAIL) {
//   logger.warn('Dev mode: redirecting email to test inbox', { originalTo: input.to });
//   input.to = process.env.RESEND_DEV_TEST_EMAIL!;
// }
