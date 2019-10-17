const User = require('../models/User');
const BlacklistedToken = require('../models/BlacklistedToken');
const jwt = require('../utils/jwt');
const { authCookieName } = require('../app-config');

module.exports = {
  registerGet: (req, res) => {
    res.render('user/register');
  },
  registerPost: async (req, res) => {
    const { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
      const error = { message: 'Both passwords must match!' };
      res.render('user/register', { error });
      return;
    }

    try {
      await User.create({ username, password });
      res.redirect('/login');
    } catch (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        const error = { message: 'Username is already taken!' };
        res.render('user/register', { error });
        return;
      }
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
        const error = { message: 'Invalid username or password!' };
        res.render('user/login', { error });
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