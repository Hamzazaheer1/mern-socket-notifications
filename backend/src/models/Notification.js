// Notification Model
// This defines the structure of notification documents in MongoDB

import mongoose from 'mongoose';

/**
 * Notification Schema
 */
const notificationSchema = new mongoose.Schema(
  {
    // The actual notification message
    message: {
      type: String,
      required: [true, 'Message is required'], 
      trim: true, 
    },

    // Who should receive this notification
    // null = broadcast to everyone
    // specific userId = only that user receives it
    userId: {
      type: String,
      default: null, // If not provided, it's a broadcast
      trim: true,
    },

    // Has the user marked this notification as read?
    isRead: {
      type: Boolean,
      default: false, // New notifications start as unread
    },

    // Type of notification (optional, for categorization)
    type: {
      type: String,
      enum: ['info', 'warning', 'success', 'error'], // Only these values allowed
      default: 'info',
    },
  },
  {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

// Create indexes for faster queries
// Index on userId - frequently querying notifications by user
notificationSchema.index({ userId: 1 });

// Index on createdAt - sorting by newest first
notificationSchema.index({ createdAt: -1 });

// Compound index - query unread notifications for a specific user
notificationSchema.index({ userId: 1, isRead: 1 });

/**
 * Create and export the model
 * 'Notification' = model name
 * MongoDB will create a collection called 'notifications'
 */
const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;

