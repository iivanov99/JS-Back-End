const Accessory = require('../models/Accessory');
const Cube = require('../models/Cube');

module.exports = {
  createGet: (req, res) => {
    const { user } = req;
    res.render('accessory/create', { user });
  },
  createPost: async (req, res) => {
    try {
      const { name, description, imageUrl } = req.body;
      const newAccessory = { name, description, imageUrl };
      await Accessory.create(newAccessory)
      res.redirect('/');
    } catch (err) {
      console.error(err);
    }
  },
  attachGet: async (req, res) => {
    try {
      const { user } = req;
      const { id: cubeId } = req.params;
      const [cube, accessories] = await Promise.all([
        Cube.findById(cubeId),
        Accessory.find({ cubes: { $nin: cubeId } })
      ]);
      res.render('accessory/attach', { cube, accessories, user });
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