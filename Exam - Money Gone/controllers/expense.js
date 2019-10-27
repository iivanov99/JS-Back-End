const models = require('../models');
const utils = require('../utils');

module.exports = {
  get: {
    create: (req, res) => {
      const { user } = req;
      res.render('expense/create', { user });
    },
    report: async (req, res) => {
      try {
        const { user } = req;
        const { id } = req.params;
        const expense = await models.Expense.findOne({ _id: id, creator: user._id });

        if (!expense) {
          throw new Error('Current user is not the expense creator!');
        }

        res.render('expense/report', { user, expense });
      } catch (err) {
        if (err.message === 'Current user is not the expense creator!') {
          res.redirect('/');
          return;
        }
      }
    },
    delete: async (req, res) => {
      try {
        const { user } = req;
        const { id } = req.params;
        await models.Expense.findOneAndDelete({ _id: id, creator: user._id });
        res.redirect('/');
      } catch (err) {
        console.error(err);
      }
    }
  },
  post: {
    create: async (req, res) => {
      const { user } = req;
      const { merchant, total, category, description } = req.body;
      const report = req.body.report === 'on';
      const creator = user._id;

      try {
        const createdExpense = await models.Expense.create({ merchant, total: +total, category, description, report, creator });
        await models.User.updateOne({ _id: user._id }, { $push: { expenses: createdExpense._id } });
        res.redirect('/');
      } catch (err) {
        if (err.name === 'ValidationError') {
          const errors = utils.extractValidationErrors(err);
          res.render('expense/create', { user, errors, oldInput: req.body });
        }
      }
    }
  }
};