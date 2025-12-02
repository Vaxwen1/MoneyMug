const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = mongoose.model('User');

const sendJSONresponse = (res, status, content) => {
  res.status(status);
  res.json(content);
};

// ----------------------------- SIGNUP -----------------------------
const userCreate = async (req, res) => {
  const { name, phone, email, password, confirm_password } = req.body;

  if (!name || !email || !password || !confirm_password) {
    return sendJSONresponse(res, 400, {
      message: 'All required fields must be filled.'
    });
  }

  if (password !== confirm_password) {
    return sendJSONresponse(res, 400, {
      message: 'Passwords do not match.'
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendJSONresponse(res, 409, {
        message: 'This email is already registered.'
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      phone,
      email,
      passwordHash
    });

    return sendJSONresponse(res, 201, {
      message: 'User created successfully.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (err) {
    console.error('Error creating user', err);
    return sendJSONresponse(res, 500, {
      message: 'Server error creating user.'
    });
  }
};

// ----------------------------- LOGIN -----------------------------
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return sendJSONresponse(res, 400, {
      message: 'Email and password are required.'
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return sendJSONresponse(res, 401, {
        message: 'Invalid email or password.'
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return sendJSONresponse(res, 401, {
        message: 'Invalid email or password.'
      });
    }
    return sendJSONresponse(res, 200, {
      message: 'Login successful.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Error logging in user', err);
    return sendJSONresponse(res, 500, {
      message: 'Server error logging in.'
    });
  }
};

module.exports = {
  userCreate,
  userLogin
};
