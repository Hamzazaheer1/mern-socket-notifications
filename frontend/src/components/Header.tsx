// Header component
import { Bell, RefreshCw, User } from 'lucide-react';
import { NotificationBadge } from './NotificationBadge';

interface HeaderProps {
  unreadCount: number;
  isLoading: boolean;
  userId: string;
  onRefresh: () => void;
}

export const Header = ({ unreadCount, isLoading, userId, onRefresh }: HeaderProps) => {
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="w-full px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 rounded-lg p-2.5">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div className="flex items-center gap-3">
              <div>
                <h2 className="text-base font-bold text-gray-900">Notifications</h2>
                <p className="text-xs text-gray-500">Real-time updates</p>
              </div>
              <NotificationBadge count={unreadCount} />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* User Info */}
            <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
              <User className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">{userId}</span>
            </div>

            {/* Refresh Button */}
            <button
              onClick={onRefresh}
              disabled={isLoading}
              className="
                flex items-center gap-2 px-4 py-2
                text-sm font-medium text-white
                bg-blue-600 hover:bg-blue-700
                rounded-lg transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
