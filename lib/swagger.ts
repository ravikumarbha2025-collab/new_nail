import swaggerJSDoc from 'swagger-jsdoc'

const options = {
  definition: {
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
          ? 'https://new-nail-h4wq.vercel.app' 
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
          required: ['name', 'email', 'phone', 'date', 'time', 'service'],
          properties: {
            _id: {
              type: 'string',
              description: 'Unique identifier for the booking',
              example: '507f1f77bcf86cd799439011',
            },
            name: {
              type: 'string',
              description: 'Customer name',
              example: 'John Doe',
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
            date: {
              type: 'string',
              description: 'Booking date',
              example: '2024-01-15',
            },
            time: {
              type: 'string',
              description: 'Booking time',
              example: '10:00 AM',
            },
            service: {
              type: 'string',
              description: 'Service requested',
              example: 'Haircut',
            },
            message: {
              type: 'string',
              description: 'Optional message from customer',
              example: 'Looking forward to the appointment!',
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
          required: ['name', 'email', 'phone', 'date', 'time', 'service'],
          properties: {
            name: {
              type: 'string',
              description: 'Customer name',
              example: 'John Doe',
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
            date: {
              type: 'string',
              description: 'Booking date',
              example: '2024-01-15',
            },
            time: {
              type: 'string',
              description: 'Booking time',
              example: '10:00 AM',
            },
            service: {
              type: 'string',
              description: 'Service requested',
              example: 'Haircut',
            },
            message: {
              type: 'string',
              description: 'Optional message from customer',
              example: 'Looking forward to the appointment!',
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
  },
  apis: ['./app/api/**/*.ts'], // Path to the API files
}

export const swaggerSpec = swaggerJSDoc(options)
