import { app } from './express'
import { env } from '../shared/CONFIG/env'
import { logger } from '../shared/LOGGER'
import { registerEvents } from '../shared/EVENTS/register-events'
import { prisma } from '../shared/DATABASE/prisma'

export const startServer = async () => {
  try {
    registerEvents()

    await prisma.$connect()
    // await redis.ping

    logger.info('Database Connected')
    // logger.info("Redis Connected")

    app.listen(env.PORT, () => {
      logger.info(`Server Running on Port ${env.PORT}`)
    })
  } catch (error) {
    logger.error(error)

    process.exit(1)
  }
}
