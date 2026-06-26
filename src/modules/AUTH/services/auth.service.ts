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
import { NotFoundError } from '../../../shared/ERRORS/not-found-error'
import { tokenService } from './token.service'

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

  if (input.password !== input.confirmPassword) {
    throw new ConflictError('Passwords do not match')
  }

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

export const resendVerificationCode = async (email: string): Promise<{ message: string }> => {
  const user = await authRepository.findUserByEmail(email)
  if (!user) {
    throw new NotFoundError('User not found')
  }

  if (user.isVerified) {
    throw new ConflictError('User already verified')
  }

  const code = otpService.generateOtp()
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000)

  await authRepository.createVerificationCode({
    userId: user.id,
    code,
    type: 'EMAIL_VERIFICATION',
    expiresAt,
  })

  // emit events for resend verificatin code
  eventBus.emit(AUTH_EVENTS.RESEND_VERIFICATION, {
    userId: user.id,
    email: user.email,
    resendVerificationCode: code,
  })

  logger.info(
    {
      userId: user.id,
      email: user.email,
    },
    'Resent verification email',
  )

  return {
    message: `Verification code resent to ${user.email}`,
  }
}

export const login = async (
  email: string,
  password: string,
): Promise<{ accessToken: string; refreshToken: string; message: string }> => {
  const user = await authRepository.findUserByEmail(email)

  if (!user) {
    throw new UnauthorizedError('Invalid email or password')
  }

  const isValidPassword = await passwordService.compare(password, user.password)
  if (!isValidPassword) {
    throw new UnauthorizedError('Invalid email or password')
  }

  if (!user.isVerified) {
    throw new UnauthorizedError('User is not verified')
  }

  const accessToken = tokenService.generateAccessToken({
    userId: user.id,
    role: user.role,
    tenantId: user.tenantId,
  })
  const refreshToken = tokenService.generateRefreshToken({
    userId: user.id,
    role: user.role,
    tenantId: user.tenantId,
  })

  // store refreshToken in db
  await authRepository.createRefreshToken({
    token: refreshToken,
    userId: user.id,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  })

  eventBus.emit(AUTH_EVENTS.LOGIN, {
    userId: user.id,
    email: user.email,
    tenantId: user.tenantId,
    role: user.role,
  })

  logger.info({ userId: user.id, email: user.email }, 'Login Successful')

  return {
    accessToken,
    refreshToken,
    message: 'Login Successful',
  }
}
