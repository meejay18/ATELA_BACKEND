import { Request, Response, NextFunction } from 'express'
import { UnauthorizedError } from '../ERRORS/unauthorized-error'
import { logger } from '../LOGGER'
import { ForbiddenError } from '../ERRORS/forbidden-error'

export const superAdminMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
  try {
    if (!req.user) {
      throw new UnauthorizedError('Aunthentication required')
    }

    if (req.user.role !== 'SUPER_ADMIN') {
      logger.warn(
        {
          userId: req.user.userId,
          role: req.user.role,
        },
        'SuperAdmin middleware: access denied',
      )

      throw new ForbiddenError('Access denied')
    }

    next()
  } catch (error) {
    next(error)
  }
}
