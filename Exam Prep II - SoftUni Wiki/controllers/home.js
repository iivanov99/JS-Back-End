const models = require('../models');

module.exports = {
  get: {
    index: async (req, res) => {
      const { user } = req;
      const articles = await models.Article.find();
      res.render('home/index', { user, articles });
    },
    search: async (req, res) => {
      try {
        const { user } = req;
        const { title } = req.query;
        const articles = await models.Article.find({ title: { $regex: new RegExp(`${title}`, 'i') } });
        res.render('home/index', { user, articles });
      } catch (err) {
        console.error(err);
      }
    }
  }
};