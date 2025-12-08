const express = require('express');

const fs = require('fs');
const http = require('http');
const https = require('https');

const privateKey  = fs.readFileSync('./sslcert/key.pem', 'utf8');
const certificate = fs.readFileSync('./sslcert/cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// ---------------- PASSPORT + SESSION ----------------
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


require('./app_api/models/db');


require('./app_api/models/user');
const User = mongoose.model('User');

const apiRoutes = require('./app_api/routes/index');
const serverRoutes = require('./app_server/routes/index');

const app = express();

// ---------------- CORS ----------------
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// ---------------- View engine (Pug) ----------------
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

// ---------------- Middleware ----------------
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

// ---------------- SESSION + PASSPORT INITIALIZATION ----------------
app.use(session({
  secret: 'moneyMugSecretKey',  
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// ---------------- PASSPORT STRATEGY (LocalStrategy) ----------------
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return done(null, false, { message: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, user.passwordHash);
      if (!isMatch) {
        return done(null, false, { message: 'Invalid email or password' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// ---------------- AUTH GUARD ----------------
const requireLogin = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/login'); // сторінка логіну з Pug
};

// ---------------- Angular static files (JS, CSS, assets) ----------------
app.use(
  express.static(
    path.join(__dirname, 'app_public'),
    { index: false }
  )
);

// ---------------- API ----------------
app.use('/api', apiRoutes);

// ---------------- Server-rendered (Pug) ----------------
app.use('/', serverRoutes);

// ---------------- Angular SPA (/)----------------
app.get('/', requireLogin, (req, res) => {
  res.sendFile(
    path.join(__dirname, 'app_public', 'index.html')
  );
});

// ---------------- 404 handler ----------------
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// ---------------- Error handler ----------------
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error =
    req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// ---------------- HTTP + HTTPS ----------------
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(8000, () => {
  console.log("HTTP server running at http://localhost:8000");
});

httpsServer.listen(443, () => {
  console.log("HTTPS server running at https://localhost:443");
});

module.exports = app;
