import { VerificationType, Currency } from '@prisma/client'
import { prisma } from '../../../shared/DATABASE/prisma'
import slugify from 'slugify'

export const authRepository = {
  findUserByEmail: (email: string) => {
    return prisma.user.findUnique({
      where: {
        email,
      },
    })
  },

  findUserById: (id: string) => {
    return prisma.user.findUnique({
      where: { id },
    })
  },

  createUser: (data: any) => {
    return prisma.user.create({ data })
  },

  createTenant: (data: { name: string; teamSize: number; currency: Currency }) => {
    const slug = slugify(data.name, { lower: true, strict: true })
    return prisma.tenant.create({
      data: {
        name: data.name,
        teamSize: data.teamSize,
        currency: data.currency,
        slug,
      },
    })
  },

  findTenantBySlug: (slug: string) => {
    return prisma.tenant.findUnique({
      where: { slug },
    })
  },

  createRefreshToken: (data: { token: string; userId: string; expiresAt: Date }) => {
    return prisma.refreshToken.create({ data })
  },

  createVerificationCode: (data: {
    code: string
    userId: string
    type: VerificationType
    expiresAt: Date
  }) => {
    return prisma.verificationCode.create({ data })
  },
}
