
# Hospital Appointment Management System

A full-stack web application for managing hospital appointments with role-based access control for patients, doctors, and administrators.

## Project Overview

This is a modern appointment booking and management system built with a React frontend and Node.js/Express backend. It allows users to book appointments with doctors, doctors to manage their schedules and appointments, and administrators to oversee the entire system.

### Key Features

- **Patient Management**: Users can register, login, and book appointments with available doctors
- **Doctor Management**: Doctors can register, create profiles, manage their availability, and view booked appointments
- **Appointment System**: Complete appointment lifecycle management - booking, confirmation, rescheduling, and cancellation
- **Admin Dashboard**: Administrators can manage users, doctors, and oversee all appointments
- **Authentication**: JWT-based authentication with role-based access control (Patient, Doctor, Admin)
- **Responsive UI**: Modern responsive design with smooth user experience

## Tech Stack

### Frontend
- **React** with TypeScript
- **Vite** - Fast build tool and dev server
- **UI Components**: Custom component library (included in `/src/components/ui/`)
- **Services**: API integration layer for backend communication

### Backend
- **Node.js** with Express.js
- **MongoDB** - NoSQL database
- **JWT** - Authentication and authorization
- **Middleware**: Custom error handling and authentication middleware

## Project Structure

```
AMSD_projectZip/
├── frontend/                 # React + TypeScript frontend
│   ├── src/
│   │   ├── pages/           # Page components (Admin, Doctor, User dashboards)
│   │   ├── components/      # Reusable components
│   │   ├── services/        # API service layer
│   │   ├── types/           # TypeScript type definitions
│   │   └── utils/           # Utility functions
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
└── backendd/                # Node.js/Express backend
    ├── controllers/         # Business logic
    ├── models/             # MongoDB models (User, Doctor, Appointment)
    ├── routes/             # API endpoints
    ├── middleware/         # Auth and error handling middleware
    ├── config/             # Database configuration
    ├── seed/               # Database seeding scripts
    ├── utils/              # Utility functions
    └── server.js           # Express server entry point
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backendd
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backendd/` directory with the following configuration:
   ```env
   MONGO_URI=mongodb://localhost:27017/amsd_app
   JWT_SECRET=your_jwt_secret_here
   PORT=5000
   ```

4. **Seed the database** (optional - to populate with initial doctor data):
   ```bash
   node seed/seed.js
   ```

5. Start the backend server:
   ```bash
   npm start
   ```
   
   The backend API will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   
   The frontend will run on `http://localhost:5173` by default

## API Overview

### Authentication Routes
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/doctor-register` - Doctor registration

### Doctor Routes
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor profile
- `POST /api/doctors` - Create doctor profile
- `PUT /api/doctors/:id` - Update doctor profile

### Appointment Routes
- `GET /api/appointments` - Get appointments
- `POST /api/appointments` - Book appointment
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

### Admin Routes
- `GET /api/admin/users` - Manage users
- `GET /api/admin/doctors` - Manage doctors
- `GET /api/admin/appointments` - View all appointments

## Database Models

### User
- Email, password (hashed)
- Full name, phone number
- Role (patient)
- Created/updated timestamps

### Doctor
- Name, specialization
- Contact information
- Availability schedule
- Credentials/experience

### Appointment
- Patient reference
- Doctor reference
- Date and time
- Status (pending, confirmed, completed, cancelled)
- Notes

## User Roles

- **Patient**: Can register, view available doctors, book appointments, and manage own appointments
- **Doctor**: Can create profile, set availability, view and manage appointments
- **Admin**: Full access to manage users, doctors, and system-wide appointments

## Available Scripts

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Backend
```bash
npm start        # Start server
npm run dev      # Start with nodemon (if configured)
node seed/seed.js          # Seed doctors data
node resetDatabase.js      # Reset database
node checkAdminAndUsers.js # Check admin and users
```

## Environment Variables

### Backend `.env`
```env
MONGO_URI=mongodb://localhost:27017/amsd_app
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development
```

## Troubleshooting

- **MongoDB Connection Error**: Ensure MongoDB is running and `MONGO_URI` is correct
- **Port Already in Use**: Change the PORT in `.env` or close the application using the port
- **CORS Issues**: Check backend server configuration for CORS settings
- **JWT Token Errors**: Verify `JWT_SECRET` is set and consistent



## License

This project is part of the AMSD (Advanced Medical System Design) curriculum project.
  
  The API will listen on port `4001` by default.
  
  ### Admin Setup
  
  To create an admin user, run:
  
  ```bash
  npm run create-admin
  ```
  
  Admin credentials:
  - **Email**: admin@medicare.com
  - **Password**: admin123
  
  
  
  Admin can:
  - View and manage all users
  - View and manage all doctors (create, edit, delete)
  - View and manage all appointments
  - Update appointment statuses
  - Promote users to admin
  
  ## Notes
  
  - The frontend now communicates with the backend for authentication, doctor data and appointments.
  - Make sure MongoDB is running locally or provide a hosted URI in `MONGO_URI`.
  - Admin dashboard is accessible at `/admin` for users with admin role.
  