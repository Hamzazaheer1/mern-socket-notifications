// Notification Page
import { Toaster } from 'react-hot-toast';
import { useNotifications } from '../hooks/useNotifications';
import { Header } from '../components/Header';
import { NotificationList } from '../components/NotificationList';

const USER_ID = 'user123';

export const NotificationPage = () => {
  const { notifications, unreadCount, isLoading, error, markAsRead, refresh } =
    useNotifications(USER_ID);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toaster position="top-right" />

      <Header
        unreadCount={unreadCount}
        isLoading={isLoading}
        userId={USER_ID}
        onRefresh={refresh}
      />

      <main className="w-full px-6 py-8">
        <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6">
            <NotificationList
              notifications={notifications}
              isLoading={isLoading}
              error={error}
              onMarkAsRead={markAsRead}
              onRetry={refresh}
            />
          </div>
        </div>
      </main>

      <footer className="w-full py-6 text-center">
        <p className="text-sm text-gray-500">
          Powered by Socket.IO • Real-time notifications
        </p>
      </footer>
    </div>
  );
};
