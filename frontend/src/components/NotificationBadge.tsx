// Notification badge component - shows unread count

interface Props {
  count: number;
}

export const NotificationBadge = ({ count }: Props) => {
  if (count === 0) return null;

  return (
    <span className="
      inline-flex items-center justify-center
      min-w-6 h-6 px-2
      text-xs font-bold text-white
      bg-red-500 rounded-full
      shadow-sm
      animate-pulse
    ">
      {count > 99 ? '99+' : count}
    </span>
  );
};
