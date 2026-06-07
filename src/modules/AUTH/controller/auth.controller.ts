import { Request, Response, NextFunction } from 'express'
import { createWorkspaceSchema } from '../validator/register-workspace.validator'
import { registerWorkspace } from '../services/auth.service'
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
