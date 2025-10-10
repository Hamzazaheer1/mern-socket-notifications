# MERN Notification Backend

Real-time notification system built with Node.js, Express, MongoDB, and Socket.IO.

## Features

- ✅ RESTful API for notification management
- ✅ Real-time notifications with Socket.IO
- ✅ Broadcast notifications (sent to all users)
- ✅ Targeted notifications (sent to specific users)
- ✅ MongoDB Atlas integration
- ✅ Swagger API documentation

## Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Socket.IO** - Real-time communication
- **Swagger** - API documentation

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Then update `.env` with your MongoDB credentials.

3. **Start the server:**
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=8000
MONGODB_URI=your-mongodb-connection-string
CLIENT_URL=http://localhost:3000
```

## API Endpoints

### Base URL
```
http://localhost:8000
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api-docs` | Swagger UI |
| POST | `/api/notifications` | Create notification |
| GET | `/api/notifications` | Get all notifications |
| GET | `/api/notifications/:id` | Get single notification |
| PATCH | `/api/notifications/:id/read` | Mark as read |
| DELETE | `/api/notifications/:id` | Delete notification |
| GET | `/api/notifications/unread/count` | Get unread count |

## API Documentation

Visit `http://localhost:8000/api-docs` to view interactive API documentation.

## Example Usage

### Create Broadcast Notification
```bash
POST /api/notifications
{
  "message": "System maintenance tonight",
  "type": "warning"
}
```

### Create Targeted Notification
```bash
POST /api/notifications
{
  "message": "Your order has shipped",
  "userId": "user123",
  "type": "success"
}
```

## Socket.IO Events

### Client → Server
- `register` - Register user with their userId

### Server → Client
- `notification` - New notification received
- `registered` - Registration confirmation

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── swagger.js         # Swagger configuration
│   ├── models/
│   │   └── Notification.js    # Notification schema
│   ├── controllers/
│   │   └── notificationController.js  # Business logic
│   ├── routes/
│   │   └── notificationRoutes.js      # API routes
│   ├── socket/
│   │   └── notificationHandler.js     # Socket.IO handlers
│   ├── app.js                 # Express app
│   └── index.js               # Server entry point
├── .env                       # Environment variables (not in git)
├── .env.example               # Environment template
├── package.json
└── README.md
```

## Development

The server uses `--watch` mode for automatic restarts on file changes:

```bash
npm run dev
```

## License

ISC

