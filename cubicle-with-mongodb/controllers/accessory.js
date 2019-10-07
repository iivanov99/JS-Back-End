const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube');

module.exports = {
  createGet: (req, res) => {
    res.render('accessory/create');
  },
  createPost: async (req, res) => {
    try {
      await Accessory.create(req.body)
      res.redirect('/');
    } catch (err) {
      console.error(err);
    }
  },
  attachGet: async (req, res) => {
    try {
      const { id: cubeId } = req.params;
      const cube = await Cube.findById(cubeId);
      const accessories = await Accessory.find({ cubes: { $nin: cubeId } });
      res.render('accessory/attach', { cube, accessories });
    } catch (err) {
      console.error(err);
    }
  },
  attachPost: async (req, res) => {
    try {
      const { id: cubeId } = req.params;
      const { accessory: accessoryId } = req.body;
      await Promise.all([
        Cube.updateOne({ _id: cubeId }, { $push: { accessories: accessoryId } }),
        Accessory.updateOne({ _id: accessoryId }, { $push: { cubes: cubeId } })
      ]);
      res.redirect('/');
    } catch (err) {
      console.error(err);
    }
  }
};