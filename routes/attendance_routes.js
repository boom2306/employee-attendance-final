const express = require('express');
const {
  clockIn,
  clockOut,
  getAllAttendance,
  getMyAttendance
} = require('../controllers/attendance_controller');

const {
  verifyToken,
  verifyAdmin
} = require('../controllers/auth_controller');

const attendanceRouter = express.Router();

// Employee attendance actions
attendanceRouter.post('/clock-in', verifyToken, clockIn);
attendanceRouter.post('/clock-out', verifyToken, clockOut);
attendanceRouter.get('/my-attendance', verifyToken, getMyAttendance);


// Admin attendance view
attendanceRouter.get('/', verifyAdmin, getAllAttendance);

module.exports = attendanceRouter;

