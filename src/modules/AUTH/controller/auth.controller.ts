import { Request, Response, NextFunction } from 'express'
import { createWorkspaceSchema } from '../validator/register-workspace.validator'
import {
  getUserProfile,
  login,
  registerWorkspace,
  resendVerificationCode,
  verifyEmail,
} from '../services/auth.service'
import { errorResponse, successResponse } from '../../../shared/RESPONSES/api-response'
import { JwtPayload } from 'jsonwebtoken'
import { UnauthorizedError } from '../../../shared/ERRORS/unauthorized-error'
import { authRepository } from '../repository/auth.repository'
import { logger } from '../../../shared/LOGGER'

export const createWorkSpaceController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsedInput = createWorkspaceSchema.parse(req.body)

    const result = await registerWorkspace(parsedInput)

    return res.status(201).json(successResponse(result, 'Workspace Created Successfully'))
  } catch (error: any) {
    if (error.errors) {
      return res.status(400).json(errorResponse('Validation failed', error.errors))
    }

    return next(error)
  }
}

export const verifyEmailController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, code } = req.body

    const result = await verifyEmail(email, code)
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return res.status(200).json(
      successResponse(
        {
          accessToken: result.accessToken,
          message: result.message,
        },
        'Email verified Successfully',
      ),
    )
  } catch (error: any) {
    if (error.errors) {
      return res.status(400).json(errorResponse('Validation failed', error.errors))
    }
    return next(error)
  }
}

export const resendVerificationCodeController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body

    const result = await resendVerificationCode(email)

    return res.status(200).json(successResponse(result, 'verification email sent successfully'))
  } catch (error: any) {
    if (error.errors) {
      return res.status(400).json(errorResponse('Failed to send Verification code', error.errors))
    }
    return next(error)
  }
}

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body

    const result = await login(email, password)

    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return res.status(200).json(
      successResponse(
        {
          accessToken: result.accessToken,
          message: result.message,
        },
        'Login Successful',
      ),
    )
  } catch (error: any) {
    if (error.errors) {
      return res.status(400).json(errorResponse('Validation Failed'))
    }
    return next(error)
  }
}

export const getUserProfileController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json(errorResponse('Unauthorized'))
    }
    const { userId, tenantId } = req.user

    if (!tenantId) {
      return res.status(404).json(errorResponse('TenantId not found'))
    }

    const result = await getUserProfile(userId, tenantId)

    logger.info({ userId: userId, tenantId: tenantId }, 'Profile Retrieved')
    return res.status(200).json(successResponse(result, 'Profile Retrieved'))
  } catch (error: any) {
    return next(error)
  }
}
