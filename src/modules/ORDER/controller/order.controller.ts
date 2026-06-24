import { Request, Response, NextFunction } from 'express'
import { createCustomOrderInput } from '../validator/create-order.validator'
import { createCustomOrderService } from '../services/order.service'
import { errorResponse, successResponse } from '../../../shared/RESPONSES/api-response'

export const createCustomOrderController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const input = req.body as createCustomOrderInput

    const { tenantId, userId: createdById } = req.user!

    if (!tenantId) {
      return res.status(401).json(errorResponse('Invalid Tenant ID'))
    }

    const result = await createCustomOrderService(input, tenantId, createdById)

    return res.status(201).json(successResponse(result, 'Order created successfully'))
  } catch (error: any) {
    return next(error)
  }
}
