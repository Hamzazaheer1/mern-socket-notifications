// Swagger API documentation configuration
import swaggerJsdoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MERN Notification API',
      version: '1.0.0',
      description: 'Real-time notification system with Socket.IO, MongoDB, and Express. Supports broadcast and targeted notifications.',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Development server',
      },
    ],
    tags: [
      {
        name: 'Notifications',
        description: 'Notification management endpoints',
      },
    ],
    components: {
      schemas: {
        Notification: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Notification ID',
              example: '67abc123def456789',
            },
            message: {
              type: 'string',
              description: 'Notification message',
              example: 'Your order has been shipped',
            },
            userId: {
              type: 'string',
              nullable: true,
              description: 'Target user ID (null for broadcast)',
              example: 'user123',
            },
            isRead: {
              type: 'boolean',
              description: 'Read status',
              example: false,
            },
            type: {
              type: 'string',
              enum: ['info', 'success', 'warning', 'error'],
              description: 'Notification type',
              example: 'info',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
            },
          },
        },
        CreateNotification: {
          type: 'object',
          required: ['message'],
          properties: {
            message: {
              type: 'string',
              description: 'Notification message',
              example: 'Your order has been shipped',
            },
            userId: {
              type: 'string',
              description: 'Target user ID (omit or set null for broadcast)',
              example: 'user123',
            },
            type: {
              type: 'string',
              enum: ['info', 'success', 'warning', 'error'],
              description: 'Notification type',
              example: 'success',
            },
          },
        },
      },
    },
  },
  apis: [join(__dirname, '../routes/notificationRoutes.js')],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;

