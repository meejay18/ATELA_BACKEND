import pinoHttp from 'pino-http'
import { logger } from '.'
export const httpLogger = pinoHttp({
  logger,
})
