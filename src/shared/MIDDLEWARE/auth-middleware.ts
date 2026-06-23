import { Request, Response, NextFunction } from 'express'
import { UnauthorizedError } from '../ERRORS/unauthorized-error'
import { JwtPayload } from '../../modules/AUTH/domain/jwt.payload'
import jwt from 'jsonwebtoken'
import { env } from '../CONFIG/env'
import { logger } from '../LOGGER'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader?.startsWith('Bearer')) {
      throw new UnauthorizedError('Unauthorized')
    }

    const token = authHeader.slice(7)

    let payload

    try {
      payload = jwt.verify(token, env.JWT_ACCESS_SECRET) as JwtPayload
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedError('Access token expired')
      }

      if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedError('Invalid access Token')
      }

      throw error
    }

    req.user = payload

    logger.debug(
      {
        userId: payload.userId,
        role: payload.role,
        tenantId: payload.tenantId,
      },
      'Auth middleware: user authenticated',
    )

    next()
  } catch (error) {
    next(error)
  }
}
