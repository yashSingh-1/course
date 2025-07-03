# Propagation - Learning Platform

A comprehensive learning platform for space science, astrophysics, and citizen science education.

## Features

- **User Authentication**: Custom JWT-based authentication system
- **Event Management**: Register for workshops, hackathons, and webinars
- **Course System**: Enroll in structured learning courses
- **Dashboard**: Track your learning progress and registrations
- **Certificate Generation**: Download participation certificates
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + Prisma + MongoDB (hosted on Render)
- **Authentication**: JWT + bcrypt
- **Database**: MongoDB with Prisma ORM

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd course
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## Authentication System

The platform uses a custom JWT-based authentication system integrated with the existing backend at `https://propagation-be.onrender.com`.

### User Registration
- POST `/api/auth/signup`
- Required fields: name, email, password
- Optional fields: phone
- Returns JWT token and user data

### User Login
- POST `/api/auth/signin`
- Required fields: email, password
- Returns JWT token and user data

### Protected Routes
- GET `/api/auth/me` - Get current user data
- POST `/api/events/:eventId/register` - Register for events
- GET `/api/user/registrations` - Get user registrations

### Frontend Integration
- Authentication context provides user state management
- Protected routes automatically redirect to sign-in
- JWT tokens stored in localStorage
- Automatic token refresh and validation

## API Endpoints

### Backend Base URL
`https://propagation-be.onrender.com`

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/signin` - User login
- `GET /api/auth/me` - Get current user (protected)

### Events
- `GET /events` - Get all events
- `GET /events/:id` - Get event by ID
- `POST /api/events/:eventId/register` - Register for event (protected)

### Courses
- `GET /courses` - Get all courses
- `GET /courses/:id` - Get course by ID

### User Data
- `GET /api/user/registrations` - Get user registrations (protected)

## Frontend Features

### Beautiful Authentication UI
- **Space-themed design** with black background and purple/blue gradients
- **Glassmorphism effects** with backdrop blur and transparency
- **Animated elements** including pulsing dots and smooth transitions
- **Responsive design** that works on all devices
- **Password visibility toggles** for better UX
- **Loading states** with spinners and disabled states

### Dashboard Features
- **Overview tab** with statistics and recent activity
- **Continue Learning tab** showing enrolled courses and registered events
- **Calendar tab** with upcoming events and courses
- **Certificate generation** with downloadable PDFs
- **Search functionality** across all content

## Development

### Running the Frontend
```bash
npm run dev
```
The frontend development server runs on port 5173 by default.

### Building for Production
```bash
npm run build
```

### Linting
```bash
npm run lint
```

## Security Features

- **Password Hashing**: bcrypt with 10 salt rounds
- **JWT Tokens**: 7-day expiration
- **Input Validation**: Required field validation
- **Protected Routes**: Middleware for route protection
- **CORS**: Configured for development and production

## Deployment

### Frontend Deployment
1. Update any environment variables if needed
2. Run `npm run build`
3. Deploy the dist folder to your hosting platform

The backend is already deployed on Render at `https://propagation-be.onrender.com`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License. 