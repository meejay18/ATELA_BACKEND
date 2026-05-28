import { Request, Response, NextFunction } from 'express'
import { AppError } from '../ERRORS/app-error'
import { errorResponse } from '../RESPONSES/api-response'

const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json(errorResponse(error.message, error.errors))
  }


  
}
