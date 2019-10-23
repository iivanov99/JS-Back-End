const models = require('../models');
const utils = require('../utils');

module.exports = {
  get: {
    create: (req, res) => {
      const { user } = req;
      res.render('accessory/create', { user });
    },
    attach: async (req, res) => {
      try {
        const { user } = req;
        const { id: cubeId } = req.params;
        const [cube, accessories] = await Promise.all([
          models.Cube.findById(cubeId),
          models.Accessory.find({ cubes: { $nin: cubeId } })
        ]);
        res.render('accessory/attach', { cube, accessories, user });
      } catch (err) {
        console.error(err);
      }
    }
  },
  post: {
    create: async (req, res) => {
      try {
        const { name, imageUrl, description } = req.body;
        await models.Accessory.create({ name, imageUrl, description });
        res.redirect('/');
      } catch (err) {
        if (err.name === 'ValidationError') {
          const errors = utils.extractValidationErrors(err);
          res.render('accessory/create', { user: req.user, errors, oldInput: req.body });
          return;
        }
        console.error(err);
      }
    },
    attach: async (req, res) => {
      try {
        const { id: cubeId } = req.params;
        const { accessory: accessoryId } = req.body;
        await Promise.all([
          models.Cube.updateOne({ _id: cubeId }, { $push: { accessories: accessoryId } }),
          models.Accessory.updateOne({ _id: accessoryId }, { $push: { cubes: cubeId } })
        ]);
        res.redirect('/');
      } catch (err) {
        console.error(err);
      }
    }
  }
};