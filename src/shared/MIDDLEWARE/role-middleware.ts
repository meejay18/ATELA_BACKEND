import { Request, Response, NextFunction } from 'express'
import { UnauthorizedError } from '../ERRORS/unauthorized-error'
import { logger } from '../LOGGER'
import { ForbiddenError } from '../ERRORS/forbidden-error'

export const authorize = (...allowedRoles: string[]) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      if (!req.user) {
        throw new UnauthorizedError('Authentication required')
      }

      const { role, userId } = req.user
      if (!allowedRoles.includes(role)) {
        logger.warn(
          {
            userId,
            role,
          },
          'Authorization Failed, Invalid Role',
        )

        throw new ForbiddenError('Access Denied')
      }

      next()
    } catch (error) {
      next(error)
    }
  }
}
