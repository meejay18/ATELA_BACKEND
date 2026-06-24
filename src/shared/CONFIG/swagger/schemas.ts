export const schemas = {
  ApiResponse: {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
        example: true,
        description: 'Indicates whether the request was successful.',
      },

      message: {
        type: 'string',
        example: 'Request successful',
         description: 'Human-readable response message.',
      },

      data: {
        type: 'object',
        description: 'Response payload. The structure depends on the endpoint.',
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

  RegisterRequest: {
    type: 'object',

    required: ['factoryName', 'email', 'password', 'confirmPassword', 'teamSize', 'currency'],

    properties: {
      factoryName: {
        type: 'string',
        example: 'Mije Fashion Store',
        description: 'Name of the workspace (tenant factory)',
      },

      email: {
        type: 'string',
        format: 'email',
        example: 'mdigban@gmail.com',
        description: 'Admin email for the workspace',
      },

      password: {
        type: 'string',
        format: 'password',
        example: 'Atela234!',
        description: 'User password (min 8 characters recommended)',
      },

      confirmPassword: {
        type: 'string',
        format: 'password',
        example: 'Atela234!',
        description: 'Must match password exactly',
      },

      teamSize: {
        type: 'integer',
        example: 15,
        description: 'Expected number of team members in the workspace',
      },

      currency: {
        type: 'string',
        example: 'NGN',
        description: 'Default workspace currency',
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

  VerifyEmailRequest: {
    type: 'object',

    required: ['email', 'code'],

    properties: {
      email: {
        type: 'string',
        format: 'email',
        example: 'mdigban@gmail.com',
        description: 'Email address used during workspace registration',
      },

      code: {
        type: 'string',
        example: '123456',
        description: '6-digit email verification code sent to the user email',
      },
    },
  },

  ResendVerificationCodeRequest: {
    type: 'object',

    required: ['email'],

    properties: {
      email: {
        type: 'string',
        format: 'email',
        example: 'mdigban@gmail.com',
        description: 'Registered email address associated with the account',
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
        example: 'johndoe@example.com',
        description: 'User registered email address',
      },

      password: {
        type: 'string',
        format: 'password',
        example: 'StrongPassword123!',
        description: 'User account password',
      },
    },
  },

  CreateCustomOrderRequest: {
    type: 'object',

    required: ['clientName', 'garmentType', 'quantity', 'stageToStart'],

    properties: {
      clientName: {
        type: 'string',
        example: 'John Doe',
        description: 'Full name of the customer.',
      },

      clientPhone: {
        type: 'string',
        nullable: true,
        example: '+2348012345678',
        description: 'Customer phone number.',
      },

      garmentType: {
        type: 'string',
        example: 'Senator',
        description: 'Type of garment requested.',
      },

      quantity: {
        type: 'integer',
        minimum: 1,
        example: 2,
        description: 'Number of garments to produce.',
      },

      deadline: {
        type: 'string',
        format: 'date-time',
        nullable: true,
        example: '2026-07-20T12:00:00.000Z',
        description: 'Expected completion date.',
      },

      stageToStart: {
        type: 'string',
        enum: ['CUTTING', 'SEWING', 'ASSEMBLING', 'FINISHING', 'QUALITY_CHECK', 'READY'],
        example: 'CUTTING',
        description: 'Production stage where work begins.',
      },

      description: {
        type: 'string',
        nullable: true,
        example: 'Use black fabric with gold buttons.',
        description: 'Additional production instructions.',
      },
    },
  },

  CreateCustomOrderResponse: {
    type: 'object',

    properties: {
      orderId: {
        type: 'string',
        format: 'uuid',
        example: '6e6b4b57-c772-4b68-aeb4-c13a24865a6b',
      },

      orderNumber: {
        type: 'string',
        example: 'ORD-20260624-0001',
      },

      status: {
        type: 'string',
        example: 'PENDING',
      },

      clientName: {
        type: 'string',
        example: 'John Doe',
      },

      garmentType: {
        type: 'string',
        example: 'Senator',
      },

      quantity: {
        type: 'integer',
        example: 2,
      },

      deadline: {
        type: 'string',
        format: 'date-time',
        nullable: true,
        example: '2026-07-20T12:00:00.000Z',
      },

      stageToStart: {
        type: 'string',
        example: 'CUTTING',
      },

      createdAt: {
        type: 'string',
        format: 'date-time',
        example: '2026-06-24T16:20:45.230Z',
      },
    },
  },
}
