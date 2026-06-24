import { Request, Response, NextFunction } from 'express'
import { AppError } from '../ERRORS/app-error'
import { errorResponse } from '../RESPONSES/api-response'
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime/library'
import { logger } from '../LOGGER'
import jwt from 'jsonwebtoken'
import { ZodError } from 'zod'
const { JsonWebTokenError } = jwt

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ZodError) {
    return res.status(400).json(errorResponse('Validation failed', error.issues))
  }

  if (error instanceof PrismaClientValidationError) {
    return res.status(400).json(errorResponse('Invalid data supplied to the database'))
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json(errorResponse(error.message, error.errors))
  }

  if (error instanceof PrismaClientKnownRequestError) {
    return res.status(400).json(errorResponse('Database operation failed'))
  }

  if (error instanceof JsonWebTokenError) {
    return res.status(401).json(errorResponse('Invalid Token'))
  }

  logger.error(
    {
      message: error.message,
      stack: error.stack,
      name: error.name,
    },
    'unhandled errors',
  )

  return res.status(500).json(errorResponse('Internal Server Error'))
}
