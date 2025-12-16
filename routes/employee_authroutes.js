const express = require('express');
const {
  registerEmployee,
  loginEmployee,
  logoutEmployee
} = require('../controllers/employee_authcontroller');

const employeeAuthRouter = express.Router();

employeeAuthRouter.post('/register', registerEmployee);
employeeAuthRouter.post('/login', loginEmployee);
employeeAuthRouter.post('/logout', logoutEmployee);

module.exports = employeeAuthRouter;
