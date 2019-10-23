const Cube = require('../models/Cube');

module.exports = {
  createGet: (req, res) => {
    res.render('cube/create');
  },
  createPost: async (req, res) => {
    try {
      const newCube = req.body;
      newCube.difficultyLevel = Number(newCube.difficultyLevel);
      await Cube.create(newCube);
      res.redirect('/');
    } catch (err) {
      console.error(err);
    }
  },
  details: async (req, res) => {
    try {
      const { id } = req.params;
      const cube = await Cube.findById(id).populate('accessories');
      res.render('cube/details', { cube });
    } catch (err) {
      console.error(err);
    }
  }
};