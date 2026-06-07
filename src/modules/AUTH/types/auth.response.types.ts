import type { Tenant, User } from '@prisma/client'

export type SafeUser = Omit<User, 'password'>

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface AuthResponse {
  user: SafeUser
  tenant: Tenant | null
  tokens: AuthTokens
}

export interface RegisterResponse {
  userId: string
  email: string
  message: string
}

export interface MeResponse {
  user: SafeUser
  tenant: Tenant | null
}
