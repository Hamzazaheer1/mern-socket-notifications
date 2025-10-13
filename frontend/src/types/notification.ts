// Notification type definition
// Matches the backend Mongoose schema

export interface Notification {
  _id: string;
  message: string;
  userId: string | null; // null = broadcast, string = targeted
  isRead: boolean;
  type: 'info' | 'success' | 'warning' | 'error';
  createdAt: string;
  updatedAt: string;
}

// API response types
export interface NotificationResponse {
  success: boolean;
  message?: string;
  data: Notification;
}

export interface NotificationsResponse {
  success: boolean;
  count: number;
  data: Notification[];
}

export interface UnreadCountResponse {
  success: boolean;
  count: number;
}

