const express = require('express');
const router = express.Router();
const ctrlDashboard = require('../controllers/dashboard');
const ctrlUsers = require('../controllers/user');
const ctrlOthers = require('../controllers/others');

/* Dashboard pages */
router.get('/', ctrlDashboard.home);

/* User pages */
router.get('/login', ctrlUsers.login);

/* Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;
