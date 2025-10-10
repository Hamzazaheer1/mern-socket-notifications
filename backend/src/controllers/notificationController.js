// Notification Controller
// This file contains all the business logic for handling notifications

import Notification from '../models/Notification.js';

/**
 * POST /api/notifications
 * Creates a new notification and saves it to database
 * Can be broadcast (userId = null) or targeted (userId = specific user)
 */
export const createNotification = async (req, res) => {
  try {
    // Extract data from request body
    const { message, userId, type } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required',
      });
    }

    // Create new notification in database
    const notification = await Notification.create({
      message,
      userId: userId || null, // If no userId provided, it's a broadcast
      type: type || 'info', // Default to 'info' if not specified
    });

    // Send success response with the created notification
    res.status(201).json({
      success: true,
      message: 'Notification created successfully',
      data: notification,
    });
  } catch (error) {
    // If something goes wrong, send error response
    res.status(500).json({
      success: false,
      message: 'Failed to create notification',
      error: error.message,
    });
  }
};

/**
 * GET ALL NOTIFICATIONS (with optional filtering)
 * GET /api/notifications
 * GET /api/notifications?userId=user123
 * GET /api/notifications?isRead=false
 * 
// Returns:

1: All notifications (if no filters)
2: Notifications for a specific user
3: Broadcasts only (userId=broadcast)
4: Read/unread filtering
 */

export const getAllNotifications = async (req, res) => {
  try {

    const { userId, isRead } = req.query;

    const filter = {};

    // If userId provided, filter by it
    // Special case: if userId="broadcast", show only broadcast notifications
    if (userId) {
      if (userId === 'broadcast') {
        filter.userId = null;
      } else {
        // Show notifications for this specific user OR broadcast notifications
        filter.$or = [{ userId: userId }, { userId: null }];
      }
    }

    // If isRead provided, filter by read status
    if (isRead !== undefined) {
      filter.isRead = isRead === 'true'; // Convert string to boolean
    }

    // Fetch notifications from database
    // Sort by newest first (-1 means descending order)
    const notifications = await Notification.find(filter).sort({
      createdAt: -1,
    });

    // Send response with notifications
    res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notifications',
      error: error.message,
    });
  }
};

/**
 * GET SINGLE NOTIFICATION
 * GET /api/notifications/:id
 * Returns a single notification by its ID
 */
export const getNotificationById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find notification by ID
    const notification = await Notification.findById(id);

    // If not found, return 404
    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found',
      });
    }

    // Send response with notification
    res.status(200).json({
      success: true,
      data: notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notification',
      error: error.message,
    });
  }
};

/**
 * MARK NOTIFICATION AS READ
 * PATCH /api/notifications/:id/read
 * Updates the isRead field to true
 */
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and update notification
    // { new: true } returns the updated document
    const notification = await Notification.findByIdAndUpdate(
      id,
      { isRead: true },
      { new: true } // Return updated document
    );

    // If notification not found
    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found',
      });
    }

    // Send success response with updated notification
    res.status(200).json({
      success: true,
      message: 'Notification marked as read',
      data: notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update notification',
      error: error.message,
    });
  }
};

/**
 * DELETE NOTIFICATION
 * DELETE /api/notifications/:id
 */
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete notification
    const notification = await Notification.findByIdAndDelete(id);

    // If not found
    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found',
      });
    }

    // Send success response
    res.status(200).json({
      success: true,
      message: 'Notification deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete notification',
      error: error.message,
    });
  }
};

/**
 * GET UNREAD COUNT
 * GET /api/notifications/unread/count
 * GET /api/notifications/unread/count?userId=user123
 * Returns count of unread notifications
 */
export const getUnreadCount = async (req, res) => {
  try {
    const { userId } = req.query;

    const filter = { isRead: false };

    // If userId provided, count only for that user (including broadcasts)
    if (userId) {
      filter.$or = [{ userId: userId }, { userId: null }];
    }

    // Count documents matching the filter
    const count = await Notification.countDocuments(filter);

    // Send response
    res.status(200).json({
      success: true,
      count: count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get unread count',
      error: error.message,
    });
  }
};

