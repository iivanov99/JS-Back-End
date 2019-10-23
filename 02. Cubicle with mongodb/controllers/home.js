const Cube = require('../models/Cube');

module.exports = {
  index: async (req, res) => {
    const cubes = await Cube.find();
    res.render('home/index', { cubes });
  },
  about: (req, res) => {
    res.render('home/about');
  },
  notFound: (req, res) => {
    res.render('home/404');
  },
  search: async (req, res) => {
    const { name } = req.query;
    const from = Number(req.query.from) || 1;
    const to = Number(req.query.to) || 6;

    const cubes = await Cube.find({
      name: { $regex: new RegExp(`${name}`, 'i') },
      difficultyLevel: { $gte: from, $lte: to }
    });

    res.render('home/index', { cubes });
  }
};