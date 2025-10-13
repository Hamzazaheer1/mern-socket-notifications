// Notification item component
import { CheckCircle2, Clock } from 'lucide-react';
import { notificationConfig } from './icons';
import type { Notification } from '../types/notification';

interface Props {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

// Get time ago helper
const getTimeAgo = (date: string): string => {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};

export const NotificationItem = ({ notification, onMarkAsRead }: Props) => {
  const config = notificationConfig[notification.type];
  const IconComponent = config.icon;

  return (
    <div
      className={`
        border-l-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200
        ${config.border} ${notification.isRead ? 'bg-white opacity-70' : config.bg}
      `}
    >
      <div className="p-4 flex items-start gap-4">
        {/* Icon */}
        <div className={`flex-shrink-0 mt-0.5 ${config.iconColor}`}>
          <IconComponent className="w-5 h-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-gray-900 font-medium leading-relaxed">
            {notification.message}
          </p>

          {/* Metadata */}
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="w-3 h-3" />
              {getTimeAgo(notification.createdAt)}
            </span>

            {notification.userId ? (
              <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-full">
                Direct
              </span>
            ) : (
              <span className="px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-700 rounded-full">
                Broadcast
              </span>
            )}
          </div>
        </div>

        {/* Action */}
        {!notification.isRead && (
          <button
            onClick={() => onMarkAsRead(notification._id)}
            className="
              flex-shrink-0 px-4 py-2 text-sm font-medium
              text-blue-700 bg-blue-100 hover:bg-blue-200
              rounded-lg transition-colors duration-200
            "
          >
            Mark Read
          </button>
        )}

        {notification.isRead && (
          <div className="flex-shrink-0 text-green-600 text-sm font-medium flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" />
            Read
          </div>
        )}
      </div>
    </div>
  );
};
