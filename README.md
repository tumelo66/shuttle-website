# 🚌 Shuttle Website for Students

A modern, real-time shuttle tracking and booking system designed for students. Features live GPS tracking, schedule management, and seamless booking with an intuitive user interface.

## ✨ Features

- **Live Shuttle Tracking**: Real-time GPS tracking with interactive maps using Leaflet.js
- **Schedule Management**: View and manage shuttle schedules with estimated arrival times
- **Booking System**: Reserve seats on shuttles in advance
- **User Authentication**: Secure student signup and login with JWT tokens
- **Responsive Design**: Mobile-first design that works on all devices
- **API-Driven Architecture**: RESTful API for seamless integration

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS styling
- **Leaflet.js** - Interactive mapping library

### Backend
- **Next.js API Routes** - Serverless backend functions
- **Node.js** - JavaScript runtime
- **Express** - Already integrated via Next.js

### Database & Authentication
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Secure token-based authentication
- **bcrypt** - Password hashing and security

## 📋 Project Structure

```
SHUTTLE/
├── src/
│   ├── app/                    # Next.js App Router pages and layout
│   │   ├── api/                # API routes
│   │   │   ├── auth/           # Authentication endpoints
│   │   │   ├── shuttles/       # Shuttle data endpoints
│   │   │   └── bookings/       # Booking management
│   │   ├── dashboard/          # Main dashboard page
│   │   ├── login/              # Login page
│   │   ├── signup/             # Signup page
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles
│   ├── components/             # React components
│   ├── lib/                    # Utility functions
│   │   ├── mongodb.ts          # MongoDB connection
│   │   └── auth.ts             # Authentication utilities
│   └── models/                 # MongoDB schemas
│       ├── User.ts             # User schema
│       ├── Shuttle.ts          # Shuttle schema
│       ├── Schedule.ts         # Schedule schema
│       ├── Booking.ts          # Booking schema
│       └── Route.ts            # Route schema
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript config
├── tailwind.config.ts          # Tailwind configuration
├── next.config.js              # Next.js configuration
└── .env.local.example          # Environment variables example
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- MongoDB running locally or MongoDB Atlas account

### Installation

1. **Clone or open the project**
   ```bash
   cd SHUTTLE
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Then edit `.env.local` with your configuration:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure random string for JWT signing

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 API Documentation

### Authentication Endpoints

#### Sign Up
```bash
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@university.edu",
  "password": "secure_password",
  "studentId": "STU123456",
  "phoneNumber": "555-0123"
}
```

#### Sign In
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@university.edu",
  "password": "secure_password"
}
```

### Shuttles Endpoints

#### Get All Shuttles
```bash
GET /api/shuttles
Authorization: Bearer {token}
```

#### Create Shuttle (Admin)
```bash
POST /api/shuttles
Authorization: Bearer {token}
Content-Type: application/json

{
  "shuttleId": "SH001",
  "name": "Shuttle A",
  "capacity": 40,
  "routeId": "{routeId}",
  "driver": "Driver Name"
}
```

### Bookings Endpoints

#### Get My Bookings
```bash
GET /api/bookings
Authorization: Bearer {token}
```

#### Create Booking
```bash
POST /api/bookings
Authorization: Bearer {token}
Content-Type: application/json

{
  "shuttleId": "{shuttleId}",
  "scheduleId": "{scheduleId}",
  "seat": 1
}
```

## 🔧 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 🗄️ Database Schema

### User Schema
- `name`: String (required)
- `email`: String (required, unique)
- `password`: String (hashed, required)
- `studentId`: String (required, unique)
- `phoneNumber`: String
- `bookings`: Array of Booking references
- `createdAt`, `updatedAt`: Timestamps

### Shuttle Schema
- `shuttleId`: String (required, unique)
- `name`: String (required)
- `capacity`: Number (default: 40)
- `currentLocation`: Object with latitude, longitude
- `status`: String (active, inactive, maintenance)
- `route`: Route reference
- `driver`: String
- `passengers`: Array of User references

### Schedule Schema
- `shuttle`: Shuttle reference (required)
- `route`: Route reference (required)
- `departureTime`: Date (required)
- `estimatedArrivalTime`: Date (required)
- `actualArrivalTime`: Date
- `seatsAvailable`: Number (default: 40)
- `status`: String (scheduled, in-progress, completed, cancelled)

### Booking Schema
- `user`: User reference (required)
- `shuttle`: Shuttle reference (required)
- `schedule`: Schedule reference (required)
- `status`: String (pending, confirmed, cancelled, completed)
- `seat`: Number (required)
- `bookingDate`: Date (default: now)

### Route Schema
- `name`: String (required, unique)
- `description`: String
- `waypoints`: Array of stop objects
- `distance`: Number
- `estimatedDuration`: Number
- `frequency`: String (hourly, every-30-mins, on-demand)
- `isActive`: Boolean (default: true)

## 🔐 Security Features

- **Password Hashing**: bcrypt with salt rounds for secure password storage
- **JWT Authentication**: Stateless authentication with token verification
- **Input Validation**: Server-side validation on all API endpoints
- **CORS Ready**: Next.js CORS middleware configured
- **Environment Variables**: Sensitive data stored in `.env.local`

## 🎨 UI Components

- **Authentication Pages**: Login and signup with form validation
- **Dashboard**: Overview of shuttles and bookings
- **Shuttle List**: View active shuttles with details
- **Schedule View**: Browse available schedules
- **Booking Interface**: Easy seat selection and confirmation

## 🚧 Future Enhancements

- [ ] Interactive Leaflet map with real-time shuttle positions
- [ ] Admin dashboard for managing shuttles and routes
- [ ] Push notifications for schedule changes
- [ ] Payment integration for premium features
- [ ] Ride history and analytics
- [ ] QR code check-in system
- [ ] Multi-language support
- [ ] Dark mode

## 📱 Browser Support

- Chrome/Edge: Latest
- Firefox: Latest
- Safari: Latest
- Mobile browsers: iOS Safari, Chrome Mobile

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 💬 Support

For issues or questions, please open an issue on the project repository.

---

**Happy tracking! 🚀**
