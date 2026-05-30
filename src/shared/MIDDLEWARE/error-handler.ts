import { Request, Response, NextFunction } from 'express'
import { AppError } from '../ERRORS/app-error'
import { errorResponse } from '../RESPONSES/api-response'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { logger } from '../LOGGER'
import jwt from 'jsonwebtoken'
const { JsonWebTokenError  } = jwt

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json(errorResponse(error.message, error.errors))
  }

  if (error instanceof PrismaClientKnownRequestError) {
    return res.status(400).json(errorResponse('Database operation failed'))
  }

  if (error instanceof JsonWebTokenError) {
    return res.status(401).json(errorResponse('Invalid Token'))
  }

  logger.error(error)

  return res.status(500).json(errorResponse('Internal Server Error'))
}
