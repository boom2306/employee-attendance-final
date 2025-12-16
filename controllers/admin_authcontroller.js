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

// Register Admin User (not used in this project)
const registerAdmin = (req, res) => {
  const { email, password } = req.body;
  const role = 'admin';

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
        message: 'Admin registered successfully',
        token
      });
    });
  });
};

// Admin login
const loginAdmin = (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM USER WHERE EMAIL='${email}' AND ROLE='admin'`;

  db.get(query, (err, admin) => {
    if (err) return res.status(500).send('Database error.');
    if (!admin) return res.status(401).send('Invalid credentials.');

    bcrypt.compare(password, admin.PASSWORD, (err, isMatch) => {
      if (!isMatch) return res.status(401).send('Invalid credentials.');

      const token = signToken(admin.ID, admin.ROLE);

      return res.status(200).json({
        message: 'Admin login successful',
        admin: {
          id: admin.ID,
          email: admin.EMAIL
        },
        token
      });
    });
  });
};

// Admin logout
const logoutAdmin = (req, res) => {
  res.clearCookie('jwt');
  return res.status(200).json({
    message: 'Logout successful'
  });
};

module.exports = {
  registerAdmin,
  loginAdmin,
  logoutAdmin
};
