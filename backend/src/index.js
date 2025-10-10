import app from './app.js';
import dotenv from 'dotenv';
// import connectDB from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 8000;

// connect to database
// connectDB();

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
