import { app } from './express'
import { env } from '../shared/CONFIG/env'
import { logger } from '../shared/LOGGER'

export const startServer = async () => {
  app.listen(env.PORT, () => {
    logger.info(`Server Running on Port ${env.PORT}`)
  })
}
