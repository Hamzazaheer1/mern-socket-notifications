// Server entry point with Socket.IO integration
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/db.js';
import { initializeSocket } from './socket/notificationHandler.js';

dotenv.config();

const PORT = process.env.PORT || 8000;

// Create HTTP server and attach Socket.IO
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  },
});

// Initialize Socket.IO handlers
const { connectedUsers } = initializeSocket(io);

// Make io and connectedUsers available globally for controllers
app.set('io', io);
app.set('connectedUsers', connectedUsers);

// Connect to database
connectDB();

// Start server
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Socket.IO server ready for connections`);
});
