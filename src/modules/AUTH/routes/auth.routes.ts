import { Router } from 'express'
// import { authMiddleware } from '../../../shared/MIDDLEWARE/auth-middleware'
// import { superAdminMiddleware } from '../../../shared/MIDDLEWARE/superAdmin-middleware'
import { createWorkSpaceController } from '../controller/auth.controller'

const router = Router()

/**
 * @swagger
 * /auth/register-workspace:
 *   post:
 *     tags:
 *       - Authentication
 *
 *     summary: Register a new workspace (tenant + admin user)
 *
 *     description: |
 *       This endpoint creates a new workspace (tenant) in ATELA and an admin user for that workspace.
 *
 *       ### What happens internally:
 *       - A new tenant (workspace) is created using `factoryName`
 *       - An admin user is created for that tenant
 *       - Email verification code is generated and sent
 *       - Workspace onboarding process is initiated
 *
 *       ### Important Rules:
 *       - `confirmPassword` must match `password`
 *       - `factoryName` becomes the workspace name
 *       - `teamSize` defines the initial team capacity
 *       - `currency` sets the workspace default currency
 *
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *
 *     responses:
 *       201:
 *         description: Workspace created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               message: Workspace Created Successfully
 *               data:
 *                 userId: "uuid-123"
 *                 email: "mdigban@gmail.com"
 *                 message: "Verification code sent to email"
 *
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *
 *       409:
 *         $ref: '#/components/responses/ConflictError'
 *
 *       500:
 *         description: Internal Server Error
 */
router.post('/register-workspace', createWorkSpaceController)

export { router as authRoutes }
