const express = require('express');
const {
  registerAdmin,
  loginAdmin,
  logoutAdmin
} = require('../controllers/admin_authcontroller');

const adminAuthRouter = express.Router();

adminAuthRouter.post('/register', registerAdmin);
adminAuthRouter.post('/login', loginAdmin);
adminAuthRouter.post('/logout', logoutAdmin);

module.exports = adminAuthRouter;
