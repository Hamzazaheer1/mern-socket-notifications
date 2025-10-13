// API service for making HTTP requests to backend
import axios from 'axios';
import type {
  NotificationsResponse,
  NotificationResponse,
  UnreadCountResponse,
} from '../types/notification';

// Base URL for backend API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch all notifications for a specific user
 * Includes broadcast notifications (userId = null)
 */
export const fetchNotifications = async (
  userId: string
): Promise<NotificationsResponse> => {
  const response = await api.get<NotificationsResponse>(
    `/api/notifications?userId=${userId}`
  );
  return response.data;
};

/**
 * Fetch all notifications (no filtering)
 */
export const fetchAllNotifications = async (): Promise<NotificationsResponse> => {
  const response = await api.get<NotificationsResponse>('/api/notifications');
  return response.data;
};

/**
 * Mark a notification as read
 */
export const markNotificationAsRead = async (
  notificationId: string
): Promise<NotificationResponse> => {
  const response = await api.patch<NotificationResponse>(
    `/api/notifications/${notificationId}/read`
  );
  return response.data;
};

/**
 * Get unread notification count for a user
 */
export const getUnreadCount = async (
  userId: string
): Promise<UnreadCountResponse> => {
  const response = await api.get<UnreadCountResponse>(
    `/api/notifications/unread/count?userId=${userId}`
  );
  return response.data;
};

/**
 * Delete a notification (bonus feature)
 */
export const deleteNotification = async (
  notificationId: string
): Promise<void> => {
  await api.delete(`/api/notifications/${notificationId}`);
};

export default api;

