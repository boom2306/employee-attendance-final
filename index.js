const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const employeeAuthRouter = require('./routes/employee_authroutes.js');
const adminAuthRouter = require('./routes/admin_authroutes.js');
const attendanceRouter = require('./routes/attendance_routes.js');

const {
  db,
  createUserTable,
  createAttendanceTable
} = require('./db.js');

// Load environment variables
dotenv.config();

// Create express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Create tables
db.run(createUserTable);
db.run(createAttendanceTable);

// Routes
// app.use('/api/v1/auth', authRouter);
app.use('/api/v1/employees/auth', employeeAuthRouter);
app.use('/api/v1/admin/auth', adminAuthRouter);
app.use('/api/v1/attendance', attendanceRouter);
// app.use('/api/v1/users', userRouter);

module.exports = {
  app
};
