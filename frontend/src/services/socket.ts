// Socket.IO service for real-time notifications
import { io, Socket } from 'socket.io-client';
import type { Notification } from '../types/notification';

// Socket.IO server URL
const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Socket instance (singleton)
let socket: Socket | null = null;

/**
 * Initialize Socket.IO connection
 * Call this once when app starts
 */
export const initializeSocket = (): Socket => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'], // Try websocket first, fallback to polling
      reconnection: true, // Auto-reconnect if connection drops
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    // Connection events
    socket.on('connect', () => {
      console.log('Socket.IO connected:', socket?.id);
    });

    socket.on('disconnect', () => {
      console.log('Socket.IO disconnected');
    });

    socket.on('connect_error', (error) => {
      console.error('Socket.IO connection error:', error);
    });
  }

  return socket;
};

/**
 * Register user with their userId
 * Backend needs this to send targeted notifications
 */
export const registerUser = (userId: string): void => {
  if (socket && socket.connected) {
    socket.emit('register', userId);
    console.log(`User registered: ${userId}`);
  } else {
    console.warn(`Cannot register user ${userId}: socket not connected`);
  }
};

/**
 * Listen for incoming notifications
 * @param callback - Function to call when notification arrives
 */
export const onNotification = (
  callback: (notification: Notification) => void
): void => {
  if (socket) {
    socket.on('notification', (notification: Notification) => {
      console.log('Notification received:', notification);
      callback(notification);
    });
  }
};

/**
 * Listen for registration confirmation
 */
export const onRegistered = (
  callback: (data: { userId: string; socketId: string }) => void
): void => {
  if (socket) {
    socket.on('registered', callback);
  }
};

/**
 * Remove all listeners (cleanup)
 */
export const removeAllListeners = (): void => {
  if (socket) {
    socket.off('notification');
    socket.off('registered');
  }
};

/**
 * Disconnect from Socket.IO server
 */
export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log('Socket.IO disconnected');
  }
};

/**
 * Get current socket instance
 */
export const getSocket = (): Socket | null => {
  return socket;
};

/**
 * Check if socket is connected
 */
export const isConnected = (): boolean => {
  return socket?.connected || false;
};

