import { logger } from '../LOGGER'
import { registerAuthListeners } from './auth/auth.listeners'

export const registerEvents = () => {
  registerAuthListeners()
  logger.info('Event listeners registered')
}
