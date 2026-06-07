export interface RegisterWorkspaceInput {
  factoryName: string
  email: string
  password: string
  teamSize: number
  confirmPassword: string
}

export interface VerifyEmailInput {
  userId: string
  code: string
}

export interface LoginInput {
  email: string
  password: string
}

export interface RefreshTokenInput {
  refreshToken: string
}
