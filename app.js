const express = require('express');

var fs = require('fs');
var http = require('http');
var https = require('https');

var privateKey  = fs.readFileSync('./sslcert/key.pem', 'utf8');
var certificate = fs.readFileSync('./sslcert/cert.pem', 'utf8');

var credentials = { key: privateKey, cert: certificate };

const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

require('./app_api/models/db');

const apiRoutes = require('./app_api/routes/index');
const serverRoutes = require('./app_server/routes/index');


const app = express();

// ---------------- CORS  ----------------
app.use((req, res, next) => {
  // Якщо ти все ще тестуєш Angular через ng serve на 4200:
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app_public static files
app.use(express.static(path.join(__dirname, 'app_public')));

// Angular static files
app.use(
  express.static(
    path.join(__dirname, 'app_public')
  )
);

// ---------------- API ----------------
app.use('/api', apiRoutes);

// ---------------- Server-rendered сторінки (Pug) ----------------
app.use('/', serverRoutes);

// ---------------- Angular SPA (/) ----------------
app.get('/', (req, res) => {
  res.sendFile(
    path.join(__dirname, 'app_public')
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

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8000, () => {
  console.log("HTTP server running at http://localhost:8000");
});

httpsServer.listen(443, () => {
  console.log("HTTPS server running at https://localhost:443");
});



module.exports = app;
