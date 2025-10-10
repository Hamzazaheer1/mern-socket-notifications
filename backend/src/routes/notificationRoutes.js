// Notification Routes - Maps URLs to controller functions

import express from 'express';
import {
  createNotification,
  getAllNotifications,
  getNotificationById,
  markAsRead,
  deleteNotification,
  getUnreadCount,
} from '../controllers/notificationController.js';

const router = express.Router();

// GET /api/notifications/unread/count?userId=user123
// Must come before /:id to avoid "unread" being treated as an ID
router.get('/unread/count', getUnreadCount);

// GET /api/notifications?userId=user123&isRead=false
router.get('/', getAllNotifications);

// POST /api/notifications - Body: { message, userId?, type? }
router.post('/', createNotification);

// GET /api/notifications/:id
router.get('/:id', getNotificationById);

// PATCH /api/notifications/:id/read
router.patch('/:id/read', markAsRead);

// DELETE /api/notifications/:id
router.delete('/:id', deleteNotification);

export default router;

