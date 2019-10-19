const User = require('../models/User');
const BlacklistedToken = require('../models/BlacklistedToken');
const jwt = require('../utils/jwt');
const { authCookieName } = require('../app-config');

module.exports = {
  registerGet: (req, res) => {
    res.render('user/register');
  },
  registerPost: async (req, res) => {
    try {
      const { username, password, repeatPassword } = req.body;

      if (password !== repeatPassword) {
        throw new Error('Both passwords must match!');
      }

      await User.create({ username, password });
      res.redirect('/login');
    } catch (err) {
      const errors = [];

      if (err.message === 'Both passwords must match!') {
        errors.push({ message: err.message });
      }

      if (err.name === 'MongoError' && err.code === 11000) {
        errors.push({ message: 'Username is already taken!' });
      }

      if (err.name === 'ValidationError') {
        Object.keys(err.errors).forEach(errKey => {
          errors.push(err.errors[errKey]);
        });
      }

      res.render('user/register', { errors });
    }
  },
  loginGet: (req, res) => {
    res.render('user/login');
  },
  loginPost: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user) {
        throw new Error('Invalid username!');
      }

      if (!await user.matchPassword(password)) {
        throw new Error('Invalid password!');
      }

      const accessToken = jwt.createToken({ userId: user._id });
      res.cookie(authCookieName, accessToken).redirect('/');
    } catch (err) {
      if (['Invalid username!', 'Invalid password!'].includes(err.message)) {
        const errors = [{ message: 'Invalid username or password!' }];
        res.render('user/login', { errors });
        return;
      }
    }
  },
  logout: async (req, res) => {
    const accessToken = req.cookies[authCookieName];
    await BlacklistedToken.create({ token: accessToken });
    res.clearCookie(authCookieName).redirect('/');
  }
};