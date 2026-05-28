// Base application error.
// Every custom error extends this.

export class AppError extends Error {
  public readonly statusCode: number
  public readonly isOperational: boolean
  public readonly errors?: unknown

  constructor(message: string, statusCode = 500, errors?: unknown) {
    super(message)

    this.name = this.constructor.name
    this.statusCode = statusCode
    this.errors = errors
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}
