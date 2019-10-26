const models = require('../models');
const utils = require('../utils');

module.exports = {
  get: {
    allArticles: async (req, res) => {
      const { user } = req;
      const articles = await models.Article.find();
      res.render('article/all-articles', { user, articles });
    },
    create: (req, res) => {
      const { user } = req;
      res.render('article/create', { user });
    },
    details: async (req, res) => {
      try {
        const { user } = req;
        const { id } = req.params;
        const article = await models.Article.findById(id);

        if (user) {
          const isCreator = article.articleAuthor.toString() === user._id.toString();
          res.render('article/details', { user, article, isCreator });
          return
        }

        res.render('article/details', { user, article });
      } catch (err) {
        console.error(err);
      }
    },
    edit: async (req, res) => {
      try {
        const { user } = req;
        const { id } = req.params;
        const article = await models.Article.findById(id);
        res.render('article/edit', { user, article });
      } catch (err) {
        console.error(err);
      }
    },
    delete: async (req, res) => {
      try {
        const { user } = req;
        const { id } = req.params;
        await models.Article.findOneAndDelete({ _id: id, articleAuthor: user._id });
        res.redirect('/');
      } catch (err) {
        console.error(err);
      }
    }
  },
  post: {
    create: async (req, res) => {
      const { user } = req;
      const { title, description } = req.body;

      try {
        const createdArticle = await models.Article.create({ title, description, articleAuthor: user._id });
        await models.User.updateOne({ _id: user._id }, { $push: { createdArticles: createdArticle._id } });
        res.redirect('/');
      } catch (err) {
        let errors = [];

        if (err.name === 'MongoError' && err.code === 11000) {
          errors = [{ message: 'Article with such title is already created!' }];
        } else if (err.name === 'ValidationError') {
          errors = utils.extractValidationErrors(err);
        }

        const oldInput = { title, description };
        res.render('article/create', { user, errors, oldInput });
      }
    },
    edit: async (req, res) => {
      const { user } = req;
      const { id } = req.params;
      const { description, title } = req.body;

      try {
        await models.Article.updateOne({ _id: id }, { description }, { runValidators: true });
        res.redirect('/');
      } catch (err) {
        if (err.name === 'ValidationError') {
          const errors = utils.extractValidationErrors(err);
          const oldInput = { _id: id, description, title };
          res.render('article/edit', { user, errors, article: oldInput });
          return;
        }
        console.error(err);
      }
    }
  }
};