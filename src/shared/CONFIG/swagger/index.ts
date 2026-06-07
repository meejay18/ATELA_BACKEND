import swaggerJsdoc from 'swagger-jsdoc'

import { tags } from './tags'
import { schemas } from './schemas'
import { responses } from './responses'
import { parameters } from './parameters'

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',

    info: {
      title: 'ATELA API',
      version: '1.0.0',
      description: 'ATELA Business Management API',
    },

    servers: [
      {
        url: 'http://localhost:5000/api/v1',
        description: 'Development',
      },
      {
        url: 'https://api.atela.com/api/v1',
        description: 'Production Server',
      },
    ],

    tags,

    security: [
      {
        bearerAuth: [],
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter a valid JWT access token',
        },
      },

      schemas,
      responses,
      parameters,
    },
  },

  apis: ['./src/modules/**/*.routes.ts'],
})
