export const AUTH_EVENTS = {
  WORKSPACE_CREATED: `auth:workspace_created`,
  EMAIL_VERIFIED: 'auth:email_verified',
  LOGIN: 'auth:login',
  LOGOUT: 'auth:logout',
  RESEND_VERIFICATION: `auth:resend verification code`,
} as const
