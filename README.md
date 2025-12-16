# Employee Attendance System

## Overview
A Node.js/Express application for managing employee attendance with clock-in/clock-out functionality. Includes separate interfaces for employees and administrators.

## Project Structure
- `server.js` - Main entry point, configures port and starts server
- `index.js` - Express app setup with middleware and routes
- `db.js` - SQLite database configuration
- `controllers/` - Business logic for authentication and attendance
- `routes/` - API route definitions
- `frontend/` - Static HTML/CSS/JS frontend files

## Tech Stack
- **Backend**: Node.js with Express
- **Database**: SQLite3
- **Authentication**: JWT (jsonwebtoken) with bcryptjs for password hashing
- **Frontend**: Vanilla HTML/CSS/JavaScript

## API Endpoints
- `POST /api/v1/employees/auth/register` - Employee registration
- `POST /api/v1/employees/auth/login` - Employee login
- `POST /api/v1/admin/auth/register` - Admin registration
- `POST /api/v1/admin/auth/login` - Admin login
- `POST /api/v1/attendance/clock-in` - Clock in (requires auth)
- `POST /api/v1/attendance/clock-out` - Clock out (requires auth)
- `GET /api/v1/attendance/my-attendance` - View own attendance (requires auth)
- `GET /api/v1/attendance` - View all attendance (admin only)

## Running the Application
This application is currently being hosted on render. (https://employee-attendance-rawhy.onrender.com)
