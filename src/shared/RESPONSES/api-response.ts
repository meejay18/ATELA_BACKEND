export type ApiSuccessResponse<T> = {
  success: true
  message?: string
  data: T
  meta?: Record<string, unknown>
}

export type ApiErrorResponse = {
  success: false
  message: string
  errors?: unknown
}

export const successResponse = <T>(
  data: T,
  message?: string,
  meta?: Record<string, unknown>,
): ApiSuccessResponse<T> => {
  return {
    success: true,
    message,
    data,
    meta,
  }
}

export const errorResponse = (message: string, errors?: unknown): ApiErrorResponse => {
  return {
    success: false,
    message,
    errors,
  }
}
