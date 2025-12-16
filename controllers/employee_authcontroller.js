const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { db } = require('../db.js');

const signToken = (id, role) => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

// Registers new employee
const registerEmployee = (req, res) => {
  const { email, password } = req.body;
  const role = 'employee';

  if (!email || !password) {
    return res.status(400).send('Please provide email and password.');
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).send('Error hashing password.');

    const query = `
      INSERT INTO USER (EMAIL, ROLE, PASSWORD)
      VALUES ('${email}', '${role}', '${hashedPassword}')
    `;

    db.run(query, function (err) {
      if (err) {
        if (err.message.includes('UNIQUE constraint')) {
          return res.status(400).send('Email already exists.');
        }
        return res.status(500).send('Database error.');
      }

      const token = signToken(this.lastID, role);

      return res.status(201).json({
        message: 'Employee registered successfully',
        token
      });
    });
  });
};

// Logs in employee
const loginEmployee = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Please provide email and password.');
  }

  const query = `SELECT * FROM USER WHERE EMAIL='${email}' AND ROLE='employee'`;

  db.get(query, (err, user) => {
    if (err) return res.status(500).send('Database error.');
    if (!user) return res.status(401).send('Invalid credentials.');

    bcrypt.compare(password, user.PASSWORD, (err, isMatch) => {
      if (!isMatch) return res.status(401).send('Invalid credentials.');

      const token = signToken(user.ID, user.ROLE);

      return res.status(200).json({
        message: 'Login successful',
        user: {
          id: user.ID,
          email: user.EMAIL,
          role: user.ROLE
        },
        token
      });
    });
  });
};

// Log out Employee
const logoutEmployee = (req, res) => {
  res.clearCookie('jwt');
  return res.status(200).json({
    message: 'Logout successful'
  });
};

module.exports = {
  registerEmployee,
  loginEmployee,
  logoutEmployee
};
