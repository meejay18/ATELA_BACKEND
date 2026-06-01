export const schemas = {
  ApiResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: true,
      },

      message: {
        type: 'string',
        example: 'Request successful',
      },

      data: {
        type: 'object',
      },
    },
  },

  ErrorResponse: {
    type: 'object',

    properties: {
      success: {
        type: 'boolean',
        example: false,
      },
      message: {
        type: 'string',
        example: 'Validation failed',
      },
      errors: {
        type: 'array',
        items: {
          type: 'object',
        },
        example: [
          {
            field: 'email',
            message: 'Invalid email address',
          },
        ],
      },
    },
  },

  LoginRequest: {
    type: 'object',

    required: ['email', 'password'],

    properties: {
      email: {
        type: 'string',
        format: 'email',
        example: 'john@example.com',
      },

      password: {
        type: 'string',
        format: 'password',
        example: 'Password123',
      },
    },
  },

  RegisterRequest: {
    type: 'object',

    required: ['firstName', 'lastName', 'email', 'password'],

    properties: {
      firstName: {
        type: 'string',
        example: 'John',
      },

      lastName: {
        type: 'string',
        example: 'Doe',
      },

      email: {
        type: 'string',
        format: 'email',
        example: 'john@example.com',
      },

      password: {
        type: 'string',
        format: 'password',
        example: 'Password123',
      },
    },
  },

  User: {
    type: 'object',

    properties: {
      id: {
        type: 'string',
        example: 'cm123456789',
      },

      firstName: {
        type: 'string',
        example: 'John',
      },

      lastName: {
        type: 'string',
        example: 'Doe',
      },

      email: {
        type: 'string',
        format: 'email',
        example: 'john@example.com',
      },

      role: {
        type: 'string',
        example: 'USER',
      },

      createdAt: {
        type: 'string',
        format: 'date-time',
        example: '2026-05-31T12:00:00.000Z',
      },

      updatedAt: {
        type: 'string',
        format: 'date-time',
        example: '2026-05-31T12:00:00.000Z',
      },
    },
  },
}
