const request = require('request');
const passport = require('passport');

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

const login = (req, res) => {
  renderLogin(req, res);
};

const loginPost = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    console.log('passport.authenticate callback:', { err, user, info });

    if (err) {
      console.error('Passport error:', err);
      return next(err);
    }

    if (!user) {
      const message =
        (info && info.message) || 'Невірний email або пароль';
      return renderLogin(
        req,
        res,
        { email: req.body.email },
        message
      );
    }

    req.logIn(user, err => {
      if (err) {
        console.error('req.logIn error:', err);
        return next(err);
      }

      return res.redirect('/');
    });
  })(req, res, next); 
};

const signup = (req, res) => {
  renderSignup(req, res);
};

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
        'Could not register right now. Please try again.'
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
