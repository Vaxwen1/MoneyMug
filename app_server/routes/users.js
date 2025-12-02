const express = require('express');
const router = express.Router();
const ctrlDashboard = require('../controllers/dashboard');
const ctrlUsers = require('../controllers/user');
const ctrlOthers = require('../controllers/others');

/* Dashboard pages */
router.get('/', ctrlDashboard.home);

/* User pages */
router.get('/login', ctrlUsers.login);
router.post('/login', ctrlUsers.loginPost);
router.get('/signup', ctrlUsers.signup);
router.post('/signup', ctrlUsers.signupPost);

/* Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;
