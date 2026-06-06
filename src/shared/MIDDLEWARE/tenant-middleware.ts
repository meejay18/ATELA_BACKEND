import { Request, Response, NextFunction } from 'express'
import { ForbiddenError } from '../ERRORS/forbidden-error'
import { prisma } from '../DATABASE/prisma'

export const tenantMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const tenantIdHeader = req.headers['x-tenant-id'] as string

    // super admin can bypass tenants
    if (req.user?.role === 'SUPER_ADMIN') {
      return next()
    }

    // provide tenant context
    if (!tenantIdHeader) {
      throw new ForbiddenError('Tenant ID header required')
    }

    // verify tenant exists and is active
    const tenant = await prisma.tenant.findUnique({
      where: {
        id: tenantIdHeader,
      },
    })

    if (!tenant || tenant.isSuspended) {
      throw new ForbiddenError('Tenant not active')
    }

    // enforce tenant isolation
    if (req.user?.tenantId !== tenantIdHeader) {
      throw new ForbiddenError('Tenant access denied')
    }
  } catch (error) {
    next(error)
  }
}
