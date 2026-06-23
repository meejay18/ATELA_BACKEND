import { Router } from 'express'
import { authMiddleware } from '../../../shared/MIDDLEWARE/auth-middleware'
import { validate } from '../../../shared/MIDDLEWARE/validate'
import { createCustomOrderSchema } from '../validator/create-order.validator'
import { createCustomOrderController } from '../controller/order.controller'

const router = Router()

router.post(
  '/createCustomOrder',
  authMiddleware,
  validate({
    body: createCustomOrderSchema,
  }),
  createCustomOrderController,
)

export { router as orderRoutes }
