import { logger } from '../../LOGGER'
import { eventBus } from '../events-bus'
import { AUTH_EVENTS } from './auth.events'
import {
  registerWorkspaceTemplate,
  resendVerificationCodeTemplate,
} from '../../EMAIL/templates/emailTemplates'
import { smtpEmailService } from '../../EMAIL/smtp/smtpService'

type WorkspaceCreatedEvent = {
  userId: string
  email: string
  tenantId: string
  tenantName: string
  teamSize: number
  currency: string
  verificationCode: string
}

export const registerAuthListeners = () => {
  eventBus.on(AUTH_EVENTS.WORKSPACE_CREATED, async (payload: WorkspaceCreatedEvent) => {
    try {
      await smtpEmailService({
        to: payload.email,
        subject: 'Welcome To Atela',
        html: registerWorkspaceTemplate({
          tenantName: payload.tenantName,
          email: payload.email,
          code: payload.verificationCode,
        }),
      })
      logger.info({ email: payload.email, tenant: payload.tenantName }, 'Workspace created, event received')
    } catch (error) {
      logger.error(
        {
          error,
          email: payload.email,
        },
        'Failed to send workspace email',
      )
    }
  })

  eventBus.on(AUTH_EVENTS.EMAIL_VERIFIED, async (payload) => {
    logger.info(payload, 'Email verified event received')
  })

  eventBus.on(AUTH_EVENTS.RESEND_VERIFICATION, async (payload) => {
    try {
      await smtpEmailService({
        to: payload.email,
        subject: 'Verify Your Email',
        html: resendVerificationCodeTemplate({
          email: payload.email,
          code: payload.resendVerificationCode,
        }),
      })

      logger.info(payload, 'Verification Code Resent')
    } catch (error) {
      logger.error(
        {
          error,
          email: payload.email,
        },
        'Failed to send verification email',
      )
    }
  })
  eventBus.on(AUTH_EVENTS.LOGIN, async (payload) => {
    logger.info(payload, 'User login event received')
  })
  eventBus.on(AUTH_EVENTS.PROFILE_RETRIEVED, async (payload) => {
    logger.info(payload, 'User Profile event received')
  })
}
