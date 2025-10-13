// Notification list component
import { Loader2, AlertTriangle, Bell, RefreshCw } from 'lucide-react';
import { NotificationItem } from './NotificationItem';
import type { Notification } from '../types/notification';

interface Props {
  notifications: Notification[];
  isLoading: boolean;
  error: string | null;
  onMarkAsRead: (id: string) => void;
  onRetry?: () => void;
}

export const NotificationList = ({
  notifications,
  isLoading,
  error,
  onMarkAsRead,
  onRetry,
}: Props) => {
  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="mt-4 text-gray-600 font-medium">Loading notifications...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="bg-red-50 rounded-full p-4 mb-4">
          <AlertTriangle className="w-12 h-12 text-red-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Failed to Load Notifications
        </h3>
        <p className="text-gray-600 mb-6">{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="
              flex items-center gap-2 px-6 py-3
              bg-blue-600 hover:bg-blue-700 text-white
              rounded-lg font-medium transition-colors
              shadow-sm hover:shadow-md
            "
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        )}
      </div>
    );
  }

  // Empty state
  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="bg-gray-50 rounded-full p-6 mb-4">
          <Bell className="w-16 h-16 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No Notifications Yet
        </h3>
        <p className="text-gray-600 max-w-md text-center">
          You're all caught up! New notifications will appear here when they arrive.
        </p>
      </div>
    );
  }

  // Notifications list
  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification._id}
          notification={notification}
          onMarkAsRead={onMarkAsRead}
        />
      ))}
    </div>
  );
};
