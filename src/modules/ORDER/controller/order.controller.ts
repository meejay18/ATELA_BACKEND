import { Request, Response, NextFunction } from 'express'
import { createCustomOrderSchema } from '../validator/create-order.validator'
import { createCustomOrderService } from '../services/order.service'
import { errorResponse, successResponse } from '../../../shared/RESPONSES/api-response'

export const createCustomOrderController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsedInput = createCustomOrderSchema.parse(req.body)

    const { tenantId, userId: createdById } = req.user!

    if (!tenantId) {
      return res.status(401).json(errorResponse('Invalid Tenant ID'))
    }

    const result = await createCustomOrderService(parsedInput, tenantId, createdById)

    return res.status(200).json(successResponse(result, 'Order created successfully'))
  } catch (error: any) {
    if (error.errors) {
      return res.status(400).json(errorResponse('Validation failed', error.errors))
    }

    return next(error)
  }
}
