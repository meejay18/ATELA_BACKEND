import { logger } from '../../LOGGER'
import { eventBus } from '../events-bus'
import { AUTH_EVENTS } from './auth.events'

export const registerAuthListeners = () => {
  eventBus.on(AUTH_EVENTS.WORKSPACE_CREATED, async (payload) => {
    logger.info(payload, 'Workspace created, event received')
  })

  eventBus.on(AUTH_EVENTS.EMAIL_VERIFIED, async (payload) => {
    logger.info(payload, 'Email verified event received')
  })

  eventBus.on(AUTH_EVENTS.LOGIN, async (payload) => {
    logger.info(payload, 'User login event received')
  })
}
