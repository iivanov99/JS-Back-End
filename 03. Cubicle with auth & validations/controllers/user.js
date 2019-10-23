const models = require('../models');
const utils = require('../utils');

module.exports = {
  get: {
    register: (req, res) => {
      res.render('user/register');
    },
    login: (req, res) => {
      res.render('user/login');
    },
    logout: (req, res) => {
      res.clearCookie('auth_cookie').redirect('/');
    }
  },
  post: {
    register: async (req, res) => {
      try {
        const { username, password, repeatPassword } = req.body;

        if (password !== repeatPassword) {
          throw new Error('Both passwords must match!');
        }

        await models.User.create({ username, password });
        res.redirect('/user/login');
      } catch (err) {
        let errors = [];

        if (err.message === 'Both passwords must match!') {
          errors = [{ message: err.message }];
        } else if (err.name === 'MongoError' && err.code === 11000) {
          errors = [{ message: 'Username is already taken!' }];
        } else if (err.name === 'ValidationError') {
          errors = utils.extractValidationErrors(err);
        }

        res.render('user/register', { errors });
      }
    },
    login: async (req, res) => {
      try {
        const { username, password } = req.body;
        const user = await models.User.findOne({ username });

        if (!user) {
          throw new Error('Invalid username!');
        }

        if (!await user.matchPassword(password)) {
          throw new Error('Invalid password!');
        }

        const accessToken = await utils.jwt.createToken({ userId: user._id });
        res.cookie('auth_cookie', accessToken).redirect('/');
      } catch (err) {
        if (['Invalid username!', 'Invalid password!'].includes(err.message)) {
          const errors = [{ message: err.message }];
          res.render('user/login', { errors });
        }
      }
    },
  },
};