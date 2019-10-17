const Cube = require('../models/Cube');

module.exports = {
  index: async (req, res) => {
    const { user } = req;
    const cubes = await Cube.find();
    res.render('home/index', { cubes, user });
  },
  about: (req, res) => {
    const { user } = req;
    res.render('home/about', { user });
  },
  notFound: (req, res) => {
    const { user } = req;
    res.render('home/404', { user });
  },
  search: async (req, res) => {
    const { user } = req;
    const { name } = req.query;
    const from = Number(req.query.from) || 1;
    const to = Number(req.query.to) || 6;

    const cubes = await Cube.find({
      name: { $regex: new RegExp(`${name}`, 'i') },
      difficultyLevel: { $gte: from, $lte: to }
    });

    res.render('home/index', { cubes, user });
  }
};