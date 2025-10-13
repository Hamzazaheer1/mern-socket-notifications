// Centralized icons and notification configurations
import { CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react';



// Notification type configurations
export const notificationConfig = {
  success: {
    icon: CheckCircle2,
    bg: 'bg-green-50',
    border: 'border-l-green-500',
    iconColor: 'text-green-600',
  },
  error: {
    icon: AlertCircle,
    bg: 'bg-red-50',
    border: 'border-l-red-500',
    iconColor: 'text-red-600',
  },
  warning: {
    icon: AlertTriangle,
    bg: 'bg-yellow-50',
    border: 'border-l-yellow-500',
    iconColor: 'text-yellow-600',
  },
  info: {
    icon: Info,
    bg: 'bg-blue-50',
    border: 'border-l-blue-500',
    iconColor: 'text-blue-600',
  },
};
