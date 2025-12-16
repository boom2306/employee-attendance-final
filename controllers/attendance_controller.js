const { db } = require('../db.js');

// Attendance Clock In
const clockIn = (req, res) => {
  const employeeId = req.user.id;
  const clockInTime = new Date().toISOString();

  const query = `
    INSERT INTO ATTENDANCE (USER_ID, CLOCK_IN)
    VALUES (${employeeId}, '${clockInTime}')
  `;

  db.run(query, (err) => {
    if (err) return res.status(500).send('Clock-in failed.');

    return res.status(201).json({
      message: 'Clock-in successful',
      clockInTime
    });
  });
};

// Attendance Clock out
const clockOut = (req, res) => {
  const employeeId = req.user.id;
  const clockOutTime = new Date().toISOString();

  const query = `
    UPDATE ATTENDANCE
    SET CLOCK_OUT='${clockOutTime}'
    WHERE USER_ID=${employeeId}
    AND CLOCK_OUT IS NULL
  `;

  db.run(query, (err) => {
    if (err) return res.status(500).send('Clock-out failed.');

    return res.status(200).json({
      message: 'Clock-out successful',
      clockOutTime
    });
  });
};

// Employees viewing their own attendance
const getMyAttendance = (req, res) => {
  const employeeId = req.user.id;

  const query = `
    SELECT CLOCK_IN, CLOCK_OUT
    FROM ATTENDANCE
    WHERE USER_ID = ${employeeId}
  `;

  db.all(query, (err, rows) => {
    if (err) {
      return res.status(500).send('Error retrieving attendance.');
    }

    return res.status(200).json({
      message: 'Your attendance records',
      results: rows.length,
      data: rows
    });
  });
};


// This is the part where admin views all employees attendance
const getAllAttendance = (req, res) => {
  const query = `
    SELECT USER.EMAIL, ATTENDANCE.CLOCK_IN, ATTENDANCE.CLOCK_OUT
    FROM ATTENDANCE
    JOIN USER ON USER.ID = ATTENDANCE.USER_ID
  `;

  db.all(query, (err, rows) => {
    if (err) return res.status(500).send('Error retrieving attendance.');

    return res.status(200).json({
      message: 'Attendance records retrieved',
      data: rows
    });
  });
};

module.exports = {
  clockIn,
  clockOut,
  getAllAttendance,
  getMyAttendance
};
