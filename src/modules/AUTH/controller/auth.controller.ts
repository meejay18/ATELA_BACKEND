import { Request, Response, NextFunction } from 'express'
import { createWorkspaceSchema } from '../validator/register-workspace.validator'
import { registerWorkspace, verifyEmail } from '../services/auth.service'
import { errorResponse, successResponse } from '../../../shared/RESPONSES/api-response'

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
