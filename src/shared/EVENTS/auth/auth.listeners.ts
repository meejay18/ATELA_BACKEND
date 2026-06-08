import { logger } from '../../LOGGER'
import { eventBus } from '../events-bus'
import { AUTH_EVENTS } from './auth.events'
import { sendEmail } from '../../EMAIL/email-service'
import { registerWorkspaceTemplate } from '../../EMAIL/templates/create-workspaceTemplate'

export const registerAuthListeners = () => {
  eventBus.on(AUTH_EVENTS.WORKSPACE_CREATED, async (payload) => {
    try {
      await sendEmail({
        to: payload.email,
        subject: 'Welcome To Atela',
        html: registerWorkspaceTemplate({
          tenantName: payload.tenantName,
          email: payload.email,
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

  eventBus.on(AUTH_EVENTS.LOGIN, async (payload) => {
    logger.info(payload, 'User login event received')
  })
}
