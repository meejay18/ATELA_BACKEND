// import {resend} from "./resend"
import nodemailer from 'nodemailer'
import { env } from '../../CONFIG/env'
import { logger } from '../../LOGGER'

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_PORT === 465,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
})

export const verifyEmailConnection = async () => {
  try {
    await transporter.verify()

    logger.info('SMTP server is ready')
  } catch (error) {
    logger.error(error, 'SMTP connection failed')
  }
}

type SendEmailInput = {
  to: string
  subject: string
  html: string
}

export const smtpEmailService = async ({ to, subject, html }: SendEmailInput) => {
  const info = await transporter.sendMail({
    from: `"ATELA" <${env.EMAIL_FROM}>`,
    to,
    subject,
    html,
  })

  logger.info(
    {
      messageId: info.messageId,
      to,
      subject,
    },
    'Email sent',
  )

  return info
}
