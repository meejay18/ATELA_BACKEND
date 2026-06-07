export const responses = {
  UnauthorizedError: {
    description: 'Unauthorized',

    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/ErrorResponse',
        },

        example: {
          success: false,
          message: 'Unauthorized',
        },
      },
    },
  },

  ValidationError: {
    description: 'Validation Failed',

    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/ErrorResponse',
        },

        example: {
          success: false,
          message: 'Validation failed',
        },
      },
    },
  },

  NotFoundError: {
    description: 'Resource Not Found',

    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/ErrorResponse',
        },

        example: {
          success: false,
          message: 'Resource not found',
        },
      },
    },
  },

  ConflictError: {
    description: 'Conflict - Resource already exists',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/ErrorResponse',
        },
        example: {
          success: false,
          message: 'An account with this email already exists',
        },
      },
    },
  },
}
