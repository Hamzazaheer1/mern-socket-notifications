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

/**
 * @swagger
 * /api/notifications/unread/count:
 *   get:
 *     summary: Get unread notification count
 *     tags: [Notifications]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: User ID to get unread count for
 *         example: user123
 *     responses:
 *       200:
 *         description: Unread count retrieved successfully
 */
router.get('/unread/count', getUnreadCount);

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Get all notifications with optional filtering
 *     tags: [Notifications]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter by user ID or "broadcast"
 *         example: user123
 *       - in: query
 *         name: isRead
 *         schema:
 *           type: boolean
 *         description: Filter by read status
 *         example: false
 *     responses:
 *       200:
 *         description: List of notifications
 */
router.get('/', getAllNotifications);

/**
 * @swagger
 * /api/notifications:
 *   post:
 *     summary: Create a new notification
 *     tags: [Notifications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateNotification'
 *           examples:
 *             broadcast:
 *               summary: Broadcast notification (to all users)
 *               value:
 *                 message: "System maintenance scheduled for tonight at 10 PM"
 *                 type: "warning"
 *             targeted:
 *               summary: Targeted notification (to specific user)
 *               value:
 *                 message: "Your order #12345 has been shipped"
 *                 userId: "user123"
 *                 type: "success"
 *     responses:
 *       201:
 *         description: Notification created successfully
 *       400:
 *         description: Invalid request
 */
router.post('/', createNotification);

/**
 * @swagger
 * /api/notifications/{id}:
 *   get:
 *     summary: Get a single notification by ID
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID
 *     responses:
 *       200:
 *         description: Notification found
 *       404:
 *         description: Notification not found
 */
router.get('/:id', getNotificationById);

/**
 * @swagger
 * /api/notifications/{id}/read:
 *   patch:
 *     summary: Mark notification as read
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID
 *     responses:
 *       200:
 *         description: Notification marked as read
 *       404:
 *         description: Notification not found
 */
router.patch('/:id/read', markAsRead);

/**
 * @swagger
 * /api/notifications/{id}:
 *   delete:
 *     summary: Delete a notification
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID
 *     responses:
 *       200:
 *         description: Notification deleted successfully
 *       404:
 *         description: Notification not found
 */
router.delete('/:id', deleteNotification);

export default router;
