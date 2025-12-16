const sqlite = require('sqlite3');
const db = new sqlite.Database('attendance.db');

// User Table
const createUserTable = `CREATE TABLE IF NOT EXISTS USER (
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  EMAIL TEXT UNIQUE NOT NULL,
  ROLE TEXT NOT NULL,
  PASSWORD TEXT NOT NULL
)`;

// Attendance Table
const createAttendanceTable = `CREATE TABLE IF NOT EXISTS ATTENDANCE (
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  USER_ID INTEGER NOT NULL,
  CLOCK_IN TEXT NOT NULL,
  CLOCK_OUT TEXT
)`;

module.exports = {
  db,
  createUserTable,
  createAttendanceTable
};
