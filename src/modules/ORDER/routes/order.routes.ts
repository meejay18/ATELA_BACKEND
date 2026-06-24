import { Router } from 'express'
import { authMiddleware } from '../../../shared/MIDDLEWARE/auth-middleware'
import { validate } from '../../../shared/MIDDLEWARE/validate'
import { createCustomOrderSchema } from '../validator/create-order.validator'
import { createCustomOrderController } from '../controller/order.controller'

const router = Router()

/**
 * @swagger
 * /order/custom:
 *   post:
 *     summary: Create a custom order
 *     description: Creates a new custom tailoring order for the authenticated tenant.
 *     operationId: createCustomOrder
 *
 *     tags:
 *       - Orders
 *
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCustomOrderRequest'
 *
 *     responses:
 *       201:
 *         description: Order created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/ApiResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/CreateCustomOrderResponse'
 *
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 *
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post(
  '/custom',
  authMiddleware,
  validate({
    body: createCustomOrderSchema,
  }),
  createCustomOrderController,
)

export { router as orderRoutes }
