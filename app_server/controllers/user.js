const request = require('request');

const apiOptions = {
  server: 'http://localhost:3000'
};

if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://moneymug.onrender.com';
}

const renderLogin = (req, res, formData = {}, error) => {
  res.render('login', {
    title: 'Login Page',
    error,
    formData
  });
};

const renderSignup = (req, res, formData = {}, error) => {
  res.render('signup', {
    title: 'Sign Up Page',
    error,
    formData
  });
};

// GET /login
const login = (req, res) => {
  renderLogin(req, res);
};

// POST /login
const loginPost = (req, res) => {
  const path = '/api/login';

  const postData = {
    email: req.body.email,
    password: req.body.password
  };

  const requestOptions = {
    url: apiOptions.server + path,
    method: 'POST',
    json: postData
  };

  request(requestOptions, (err, response, body) => {
    if (err) {
      console.error('Error calling API /api/login', err);
      return renderLogin(
        req,
        res,
        postData,
        'Could not log you in right now. Please try again.'
      );
    }

    const status = response && response.statusCode;

    if (status === 200) {
      return res.redirect('/');
    }

    let errorMessage = 'Login failed.';
    if (body && body.message) {
      errorMessage = body.message;
    }

    return renderLogin(req, res, postData, errorMessage);
  });
};

// GET /signup
const signup = (req, res) => {
  renderSignup(req, res);
};

// POST /signup
const signupPost = (req, res) => {
  const path = '/api/users';

  const postData = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    confirm_password: req.body.confirm_password
  };

  const requestOptions = {
    url: apiOptions.server + path,
    method: 'POST',
    json: postData
  };

  request(requestOptions, (err, response, body) => {
    if (err) {
      console.error('Error calling API /api/users', err);
      return renderSignup(
        req,
        res,
        postData,
        'Could not register user right now. Please try again.'
      );
    }

    const status = response && response.statusCode;

    if (status === 201) {
      return res.redirect('/login');
    }

    let errorMessage = 'Registration failed.';
    if (body && body.message) {
      errorMessage = body.message;
    }

    return renderSignup(req, res, postData, errorMessage);
  });
};

module.exports = {
  login,
  loginPost,
  signup,
  signupPost
};
