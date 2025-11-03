import swaggerJSDoc from 'swagger-jsdoc'
import path from 'path'

const definition = {
  openapi: '3.0.0',
  info: {
    title: 'Booking Email Service API',
    version: '1.0.0',
    description: 'A simple API for handling booking requests with email notifications and MongoDB storage',
    contact: {
      name: 'API Support',
      email: 'support@example.com',
    },
  },
  servers: [
    {
      url: process.env.NODE_ENV === 'production' 
        ? 'https://new-nail.vercel.app' 
        : 'http://localhost:3000',
      description: process.env.NODE_ENV === 'production' 
        ? 'Production server' 
        : 'Development server',
    },
  ],
  components: {
    schemas: {
      Booking: {
        type: 'object',
        required: [],
        properties: {
          _id: {
            type: 'string',
            description: 'Unique identifier for the booking',
            example: '507f1f77bcf86cd799439011',
          },
          firstName: {
            type: 'string',
            description: 'Customer first name',
            example: 'John',
            minLength: 2,
            maxLength: 50,
          },
          lastName: {
            type: 'string',
            description: 'Customer last name',
            example: 'Doe',
            minLength: 2,
            maxLength: 50,
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'Customer email address',
            example: 'john.doe@example.com',
          },
          phone: {
            type: 'string',
            description: 'Customer phone number',
            example: '1234567890',
            minLength: 10,
            maxLength: 15,
          },
          service: {
            type: 'string',
            description: 'Service requested',
            example: 'Haircut',
          },
          staff: {
            type: 'string',
            description: 'Selected staff member',
            example: 'Sarah Johnson',
          },
          appointmentDate: {
            type: 'string',
            description: 'Appointment date',
            example: '2024-01-15',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: 'Booking creation timestamp',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: 'Booking last update timestamp',
          },
        },
      },
      BookingRequest: {
        type: 'object',
        required: [],
        properties: {
          firstName: {
            type: 'string',
            description: 'Customer first name',
            example: 'John',
          },
          lastName: {
            type: 'string',
            description: 'Customer last name',
            example: 'Doe',
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'Customer email address',
            example: 'john.doe@example.com',
          },
          phone: {
            type: 'string',
            description: 'Customer phone number',
            example: '1234567890',
          },
          service: {
            type: 'string',
            description: 'Service requested',
            example: 'Haircut',
          },
          staff: {
            type: 'string',
            description: 'Selected staff member',
            example: 'Sarah Johnson',
          },
          appointmentDate: {
            type: 'string',
            description: 'Appointment date',
            example: '2024-01-15',
          },
        },
      },
      ApiResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            description: 'Indicates if the request was successful',
          },
          message: {
            type: 'string',
            description: 'Response message',
          },
          data: {
            type: 'object',
            description: 'Response data',
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
            description: 'Error message',
          },
          errors: {
            type: 'object',
            description: 'Validation errors (if any)',
          },
        },
      },
    },
  },
}

// Manually defined paths (works in production)
const manualPaths = {
  '/api/bookings': {
    post: {
      summary: 'Create a new booking',
      description: 'Creates a new booking, saves it to the database, and sends email notifications to both admin and customer',
      tags: ['Bookings'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/BookingRequest',
            },
            example: {
              firstName: 'John',
              lastName: 'Doe',
              email: 'john.doe@example.com',
              phone: '1234567890',
              service: 'Haircut',
              staff: 'Sarah Johnson',
              appointmentDate: '2024-01-15',
            },
          },
        },
      },
      responses: {
        '201': {
          description: 'Booking created successfully',
          content: {
            'application/json': {
              schema: {
                allOf: [
                  { $ref: '#/components/schemas/ApiResponse' },
                  {
                    type: 'object',
                    properties: {
                      data: {
                        type: 'object',
                        properties: {
                          id: { type: 'string', example: '507f1f77bcf86cd799439011' },
                          firstName: { type: 'string', example: 'John' },
                          lastName: { type: 'string', example: 'Doe' },
                          email: { type: 'string', example: 'john.doe@example.com' },
                          service: { type: 'string', example: 'Haircut' },
                          staff: { type: 'string', example: 'Sarah Johnson' },
                          appointmentDate: { type: 'string', example: '2024-01-15' },
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        },
        '400': {
          description: 'Validation error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
            },
          },
        },
        '500': {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
            },
          },
        },
      },
    },
    get: {
      summary: 'Get all bookings',
      description: 'Retrieves all bookings from the database, sorted by creation date (newest first)',
      tags: ['Bookings'],
      responses: {
        '200': {
          description: 'List of all bookings',
          content: {
            'application/json': {
              schema: {
                allOf: [
                  { $ref: '#/components/schemas/ApiResponse' },
                  {
                    type: 'object',
                    properties: {
                      data: {
                        type: 'array',
                        items: {
                          $ref: '#/components/schemas/Booking',
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        },
        '500': {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
            },
          },
        },
      },
    },
  },
  '/api/bookings/{id}': {
    get: {
      summary: 'Get a specific booking by ID',
      description: 'Retrieves a single booking by its unique identifier',
      tags: ['Bookings'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'The booking ID',
          example: '507f1f77bcf86cd799439011',
        },
      ],
      responses: {
        '200': {
          description: 'Booking found',
          content: {
            'application/json': {
              schema: {
                allOf: [
                  { $ref: '#/components/schemas/ApiResponse' },
                  {
                    type: 'object',
                    properties: {
                      data: {
                        $ref: '#/components/schemas/Booking',
                      },
                    },
                  },
                ],
              },
            },
          },
        },
        '404': {
          description: 'Booking not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
            },
          },
        },
        '500': {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
            },
          },
        },
      },
    },
    delete: {
      summary: 'Delete a booking by ID',
      description: 'Permanently deletes a booking from the database',
      tags: ['Bookings'],
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'The booking ID',
          example: '507f1f77bcf86cd799439011',
        },
      ],
      responses: {
        '200': {
          description: 'Booking deleted successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ApiResponse',
              },
            },
          },
        },
        '404': {
          description: 'Booking not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
            },
          },
        },
        '500': {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
            },
          },
        },
      },
    },
  },
}

// Try to generate spec from files (works in development)
// Fall back to manual paths (works in production)
let swaggerSpec: any

if (process.env.NODE_ENV === 'development') {
  try {
    const options = {
      definition,
      apis: [
        path.join(process.cwd(), 'app/api/**/*.ts'),
        path.join(process.cwd(), 'app/api/**/*.tsx'),
      ],
    }
    const generated = swaggerJSDoc(options) as any
    
    // If generated paths exist, use them; otherwise use manual paths
    if (generated.paths && Object.keys(generated.paths).length > 0) {
      swaggerSpec = generated
      console.log(`✅ Swagger: Generated spec with ${Object.keys(generated.paths).length} API path(s)`)
    } else {
      swaggerSpec = {
        ...definition,
        paths: manualPaths,
      }
      console.log('✅ Swagger: Using manually defined paths')
    }
  } catch (error) {
    console.warn('⚠️  Swagger: Could not parse files, using manual paths:', error)
    swaggerSpec = {
      ...definition,
      paths: manualPaths,
    }
  }
} else {
  // Production: always use manual paths
  swaggerSpec = {
    ...definition,
    paths: manualPaths,
  }
}

export { swaggerSpec }
