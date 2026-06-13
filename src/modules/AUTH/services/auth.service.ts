import { ConflictError } from '../../../shared/ERRORS/conflict-error'
import { authRepository } from '../repository/auth.repository'
import { RegisterResponse } from '../types'
import { CreateWorkspaceInput } from '../validator/register-workspace.validator'
import { passwordService } from './password.service'
import { otpService } from './otp.service'
import { eventBus } from '../../../shared/EVENTS/events-bus'
import { AUTH_EVENTS } from '../../../shared/EVENTS/auth/auth.events'
import { logger } from '../../../shared/LOGGER'
import slugify from 'slugify'
import { UnauthorizedError } from '../../../shared/ERRORS/unauthorized-error'
const OTP_EXPIRY_MINUTES = 15
import jwt from 'jsonwebtoken'
import { env } from '../../../shared/CONFIG/env'
import type { StringValue } from 'ms'

export const registerWorkspace = async (input: CreateWorkspaceInput): Promise<RegisterResponse> => {
  const existingUser = await authRepository.findUserByEmail(input.email)

  if (existingUser) {
    throw new ConflictError('An account with this email already exists')
  }

  const slug = slugify(input.factoryName, { lower: true, strict: true })

  const existingTenant = await authRepository.findTenantBySlug(slug)
  if (existingTenant) {
    throw new ConflictError('Workspace already exists')
  }

  const tenant = await authRepository.createTenant({
    name: input.factoryName,
    teamSize: input.teamSize,
    currency: input.currency,
  })

  const hashPassword = await passwordService.hash(input.password)

  const user = await authRepository.createUser({
    email: input.email,
    password: hashPassword,
    tenantId: tenant.id,
    role: 'ADMIN',
  })

  const code = otpService.generateOtp()
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000)

  await authRepository.createVerificationCode({
    userId: user.id,
    code,
    type: 'EMAIL_VERIFICATION',
    expiresAt,
  })

  eventBus.emit(AUTH_EVENTS.WORKSPACE_CREATED, {
    userId: user.id,
    email: user.email,
    tenantId: tenant.id,
    tenantName: tenant.name,
    teamSize: tenant.teamSize,
    currency: tenant.currency,
    verificationCode: code,
  })

  logger.info({ userId: user.id, email: user.email, tenantId: tenant.id }, 'Workspace registered')

  return {
    userId: user.id,
    email: user.email,
    message: `Verification Successful, Code sent to ${user.email}`,
  }
}

export const verifyEmail = async (
  email: string,
  code: string,
): Promise<{ accessToken: string; refreshToken: string; message: string }> => {
  const user = await authRepository.findUserByEmail(email)

  if (!user) {
    throw new UnauthorizedError('User not found')
  }

  if (user.isVerified) {
    throw new ConflictError('Email already verified')
  }

  const verification = await authRepository.findVerificationCode(user.id, code)

  if (!verification || verification.expiresAt < new Date()) {
    throw new UnauthorizedError('Invalid or expired Verification code')
  }
  await authRepository.markUserAsVerified(user.id)

  const accessToken = jwt.sign({ userId: user.id }, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRES as StringValue,
  })

  const refreshToken = jwt.sign({ userId: user.id }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRES as StringValue,
  })

  await authRepository.createRefreshToken({
    token: refreshToken,
    userId: user.id,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  })

  eventBus.emit(AUTH_EVENTS.EMAIL_VERIFIED, { userId: user.id })

  logger.info({ userId: user.id }, 'Email Verified Successfully')

  return {
    accessToken,
    refreshToken,
    message: 'Email verified successfully',
  }
}
