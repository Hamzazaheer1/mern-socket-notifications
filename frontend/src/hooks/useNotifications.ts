// Simple hook for notifications
import { useState, useEffect } from 'react';
import type { Notification } from '../types/notification';
import { fetchNotifications, markNotificationAsRead } from '../services/api';
import { initializeSocket, registerUser, onNotification } from '../services/socket';
import toast from 'react-hot-toast';

export const useNotifications = (userId: string) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load notifications
  const loadNotifications = async () => {
    try {
      setIsLoading(true);
      const response = await fetchNotifications(userId);
      setNotifications(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load notifications');
    } finally {
      setIsLoading(false);
    }
  };

  // Mark as read
  const markAsRead = async (id: string) => {
    try {
      await markNotificationAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      toast.error('Failed to mark as read');
    }
  };

  // Initialize
  useEffect(() => {
    // Connect socket
    const socket = initializeSocket();
    
    // Wait for socket connection before registering user
    const handleConnect = () => {
      console.log('Socket connected, registering user:', userId);
      registerUser(userId);
    };

    // Listen for connection event
    socket.on('connect', handleConnect);
    
    // If already connected, register immediately
    if (socket.connected) {
      registerUser(userId);
    }

    // Listen for new notifications
    onNotification((notification) => {
      setNotifications((prev) => {
        // Check if notification already exists (prevent duplicates)
        const exists = prev.some((n) => n._id === notification._id);
        if (exists) {
          console.log('Notification already exists, skipping:', notification._id);
          return prev;
        }
        return [notification, ...prev];
      });
      
      toast(notification.message, {
        icon: '🔔',
        duration: 4000,
      });
    });

    // Load notifications
    loadNotifications();

    // Cleanup
    return () => {
      socket.off('connect', handleConnect);
    };
  }, [userId]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return {
    notifications,
    unreadCount,
    isLoading,
    error,
    markAsRead,
    refresh: loadNotifications,
  };
};
