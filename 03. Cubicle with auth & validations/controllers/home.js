const models = require('../models');

module.exports = {
  get: {
    index: async (req, res) => {
      const { user } = req;
      const cubes = await models.Cube.find();
      res.render('home/index', { cubes, user });
    },
    about: (req, res) => {
      const { user } = req;
      res.render('home/about', { user });
    },
    notFound: (req, res) => {
      const { user } = req;
      res.render('home/404', { user });
    }
  }
};