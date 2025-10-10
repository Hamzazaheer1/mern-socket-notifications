// Socket.IO notification handler for real-time communication

/**
 * Initialize Socket.IO event handlers
 * @param {Server} io - Socket.IO server instance
 */
export const initializeSocket = (io) => {
  // Store connected users: { userId: socketId }
  const connectedUsers = new Map();

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // User registers with their userId
    socket.on('register', (userId) => {
      if (userId) {
        connectedUsers.set(userId, socket.id);
        console.log(`User registered: ${userId} with socket ${socket.id}`);
        
        // Send confirmation back to client
        socket.emit('registered', { userId, socketId: socket.id });
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      // Remove user from connected users map
      for (const [userId, socketId] of connectedUsers.entries()) {
        if (socketId === socket.id) {
          connectedUsers.delete(userId);
          console.log(`User disconnected: ${userId}`);
          break;
        }
      }
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  return { io, connectedUsers };
};

/**
 * Emit notification to clients
 * @param {Server} io - Socket.IO server instance
 * @param {Map} connectedUsers - Map of connected users
 * @param {Object} notification - Notification object from database
 */
export const emitNotification = (io, connectedUsers, notification) => {
  if (!notification.userId) {
    // Broadcast to all connected clients
    io.emit('notification', notification);
    console.log(`Broadcast notification sent to all clients`);
  } else {
    // Send to specific user if they're connected
    const socketId = connectedUsers.get(notification.userId);
    if (socketId) {
      io.to(socketId).emit('notification', notification);
      console.log(`Targeted notification sent to user: ${notification.userId}`);
    } else {
      console.log(`User ${notification.userId} not connected, notification saved in DB`);
    }
  }
};

