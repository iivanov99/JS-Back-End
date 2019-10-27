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
    },
    profile: async (req, res) => {
      const { id } = req.params;
      const user = await models.User.findById(id).populate('expenses');
      const totalMerches = user.expenses.length;

      let totalExpenses = 0;
      user.expenses.forEach(expense => totalExpenses += expense.total);

      res.render('user/profile', { user, totalExpenses, totalMerches });
    }
  },
  post: {
    register: async (req, res) => {
      try {
        const { username, password, repeatPassword, amount } = req.body;

        if (password !== repeatPassword) {
          throw new Error('Both passwords must match!');
        }

        await models.User.create({ username, password, amount });
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
    refill: async (req, res) => {
      try {
        const { id } = req.params;
        let amount = +req.body.amount;
        const user = await models.User.findById(id);
        amount += user.amount;
        await models.User.updateOne({ _id: id }, { amount });
        res.redirect('/');
      } catch (err) {
        console.error(err);
      }
    }
  },
};