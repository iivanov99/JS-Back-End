const models = require('../models');

module.exports = {
  get: {
    index: async (req, res) => {
      const { user } = req;

      if (!user) {
        res.render('home/index');
        return;
      }

      const expenses = await models.Expense.find({ creator: user._id });
      res.render('home/index', { user, expenses });
    },
    notFound: (req, res) => {
      const { user } = req;
      res.render('home/404', { user });
    }
  }
};