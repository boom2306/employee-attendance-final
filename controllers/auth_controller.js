const jwt = require('jsonwebtoken');

// Checks if user is logged in
const verifyToken = (req, res, next) => {
  // Gets the authorization header
  const authHeader = req.headers.authorization;

  // Checks if header exists
  if (!authHeader) {
    return res.status(403).send('No token provided');
  }

  // Split "Bearer token"
  const token = authHeader.split(' ')[1];

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send('Invalid token');
    }

    // Save user info in request
    req.user = decoded;

    next();
  });
};

// Checks if user is admin
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).send('Admins only');
    }

    next();
  });
};

module.exports = {
  verifyToken,
  verifyAdmin
};
