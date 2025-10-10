// Express app configuration
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import notificationRoutes from './routes/notificationRoutes.js';
import swaggerSpec from './config/swagger.js';

const app = express();

// Middleware
app.use(cors({
  origin: '*', // Allow all origins for development
  credentials: true,
}));
app.use(express.json());

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/notifications', notificationRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

export default app;
