import { NextFunction, Request, Response } from 'express'
import { ZodTypeAny } from 'zod'

import { errorResponse } from '../RESPONSES/api-response'

type validationSchema = {
  body?: ZodTypeAny
  params?: ZodTypeAny
  query?: ZodTypeAny
}

 export const validate = (schema: validationSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const bodyResult = schema.body?.safeParse(req.body)
    const paramsResult = schema.params?.safeParse(req.params)
    const queryResult = schema.query?.safeParse(req.query)

    const errors = {
      body: bodyResult && !bodyResult.success ? bodyResult.error.flatten() : null,

      params: paramsResult && !paramsResult.success ? paramsResult.error.flatten() : null,

      query: queryResult && !queryResult.success ? queryResult.error.flatten() : null,
    }

    const hasErrors = Object.values(errors).some(Boolean)

    if (hasErrors) {
      return res.status(400).json(errorResponse('Validation failed', errors))
    }

    next()
  }
}
