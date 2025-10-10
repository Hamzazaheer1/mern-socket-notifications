// Database Configuration File
// This file handles MongoDB connection using Mongoose

import mongoose from 'mongoose';

/**
 * Connect to MongoDB database
 * Uses connection string from .env file
 * Mongoose handles connection pooling automatically
 */
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database Name: ${conn.connection.name}`);
  } catch (error) {
    // If connection fails, log error and exit the process
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit with failure code
  }
};

export default connectDB;

