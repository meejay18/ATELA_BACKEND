import { Router } from 'express'
// import { authMiddleware } from '../../../shared/MIDDLEWARE/auth-middleware'
// import { superAdminMiddleware } from '../../../shared/MIDDLEWARE/superAdmin-middleware'
import {
  createWorkSpaceController,
  resendVerificationCodeController,
  verifyEmailController,
} from '../controller/auth.controller'
import { validate } from '../../../shared/MIDDLEWARE/validate'
import { verifyEmailSchema } from '../validator/verify-email.validator'
import { createWorkspaceSchema } from '../validator/register-workspace.validator'
import { resendVerificationSchema } from '../validator/resendCode.validator'

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
router.post(
  '/register-workspace',
  validate({
    body: createWorkspaceSchema,
  }),
  createWorkSpaceController,
)

/**
 * @swagger
 * /auth/verify-email:
 *   post:
 *     tags:
 *       - Authentication
 *
 *     summary: Verify user email address
 *
 *     description: |
 *       This endpoint verifies a user's email address using the verification code
 *       sent during workspace registration.
 *
 *       ### What happens internally:
 *       - The user is located using the provided email address
 *       - The verification code is validated
 *       - The code expiry time is checked
 *       - The user's email is marked as verified
 *       - Access and refresh tokens are generated
 *       - A refresh token is stored in the database
 *       - An email verified event is emitted
 *
 *       ### Important Rules:
 *       - The email must belong to a registered user
 *       - The verification code must be valid
 *       - The verification code must not be expired
 *       - An already verified email cannot be verified again
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerifyEmailRequest'
 *
 *     responses:
 *       200:
 *         description: Email verified successfully
 *         headers:
 *           Set-Cookie:
 *             description: HttpOnly refresh token cookie
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               message: Email verified Successfully
 *               data:
 *                 accessToken: "eyJhbGciOiJIUzI1NiIs..."
 *                 message: "Email verified successfully"
 *
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: Validation failed
 *               errors:
 *                 body:
 *                   fieldErrors:
 *                     email:
 *                       - Invalid email address
 *                     code:
 *                       - String must contain exactly 6 character(s)
 *
 *       401:
 *         description: Invalid verification attempt
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               UserNotFound:
 *                 summary: User does not exist
 *                 value:
 *                   success: false
 *                   message: User not found
 *
 *               InvalidCode:
 *                 summary: Invalid or expired code
 *                 value:
 *                   success: false
 *                   message: Invalid or expired Verification code
 *
 *       409:
 *         description: Email already verified
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: Email already verified
 *
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: Internal Server Error
 */
router.post(
  '/verify-email',
  validate({
    body: verifyEmailSchema,
  }),
  verifyEmailController,
)

/**
 * @swagger
 * /auth/resendVerificationCode:
 *   post:
 *     tags:
 *       - Authentication
 *
 *     summary: Resend email verification code
 *
 *     description: |
 *       This endpoint generates and sends a new email verification code
 *       to a user who has not yet verified their email address.
 *
 *       ### What happens internally:
 *       - The user is located using the provided email address
 *       - The user's verification status is checked
 *       - A new verification code is generated
 *       - A new expiration time is created
 *       - The verification code is stored in the database
 *       - A resend verification event is emitted
 *       - A verification email is sent asynchronously
 *
 *       ### Important Rules:
 *       - The email must belong to an existing user
 *       - The user must not already be verified
 *       - A new verification code replaces previous verification attempts
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResendVerificationCodeRequest'
 *
 *     responses:
 *       200:
 *         description: Verification code sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *             example:
 *               success: true
 *               message: verification email sent successfully
 *               data:
 *                 message: Verification code resent to johndoe@example.com
 *
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: Failed to send Verification code
 *               errors:
 *                 body:
 *                   fieldErrors:
 *                     email:
 *                       - Invalid email address
 *
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: User not found
 *
 *       409:
 *         description: User already verified
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: User already verified
 *
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             example:
 *               success: false
 *               message: Internal Server Error
 */
router.post(
  '/resendVerificationCode',
  validate({
    body: resendVerificationSchema,
  }),
  resendVerificationCodeController,
)

export { router as authRoutes }
