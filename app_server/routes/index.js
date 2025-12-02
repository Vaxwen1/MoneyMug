const express = require('express');
const router = express.Router();
const passport = require('passport');

const ctrlDashboard = require('../controllers/dashboard');
const ctrlUsers = require('../controllers/user');
const ctrlOthers = require('../controllers/others');


const requireLogin = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/login');
};


router.get('/test-auth', (req, res) => {
  res.json({
    authenticated: req.isAuthenticated && req.isAuthenticated(),
    user: req.user || null
  });
});


router.get('/dashboard', requireLogin, ctrlDashboard.home);

/* Auth pages */

router.get('/login', ctrlUsers.login);


router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',    
    failureRedirect: '/login'
  })
);

router.get('/signup', ctrlUsers.signup);
router.post('/signup', ctrlUsers.signupPost);

/* Logout */
router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/login');
  });
});

/* Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;
