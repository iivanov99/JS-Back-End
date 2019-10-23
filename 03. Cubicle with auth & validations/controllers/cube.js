const models = require('../models');

module.exports = {
  get: {
    create: (req, res) => {
      const { user } = req;
      res.render('cube/create', { user });
    },
    details: async (req, res) => {
      try {
        const { user } = req;
        const { id } = req.params;
        const cube = await models.Cube.findById(id).populate('accessories');

        if (user) {
          const isCreator = cube.creatorId.toString() === user._id.toString();
          res.render('cube/details', { cube, user, isCreator });
          return;
        }

        res.render('cube/details', { cube, user });
      } catch (err) {
        console.error(err);
      }
    },
    edit: async (req, res) => {
      try {
        const { user } = req;
        const { id } = req.params;
        const cube = await models.Cube.findOne({ _id: id, creatorId: user._id });
        if (!cube) { throw new Error('Current user is not the cube creator!'); }
        res.render('cube/edit', { cube, user });
      } catch (err) {
        if (err.message === 'Current user is not the cube creator!') {
          res.redirect('/');
          return;
        }
        console.error(err);
      }
    },
    delete: async (req, res) => {
      const difficultyText = {
        1: '1 - Very Easy', 2: '2 - Easy',
        3: '3 Medium (Standart 3x3)',
        4: '4 - Intermediate',
        5: '5 - Expert',
        6: '6 - Hardcore'
      };

      try {
        const { user } = req;
        const { id } = req.params;
        const cube = await models.Cube.findOne({ _id: id, creatorId: user._id });
        if (!cube) { throw new Error('Current user is not the cube creator!'); }
        res.render('cube/delete', { cube, user, difficultyText: difficultyText[cube.difficultyLevel] });
      } catch (err) {
        if (err.message === 'Current user is not the cube creator!') {
          res.redirect('/');
          return;
        }
        console.error(err);
      }
    }
  },
  post: {
    create: async (req, res) => {
      try {
        const { user } = req;
        const { name, description, imageUrl, difficultyLevel } = req.body;
        await models.Cube.create({ name, description, imageUrl, difficultyLevel: +difficultyLevel, creatorId: user._id });
        res.redirect('/');
      } catch (err) {
        if (err.name === 'ValidationError') {
          const errors = [];
          Object.keys(err.errors).forEach(errorKey => errors.push(err.errors[errorKey]));
          res.render('cube/create', { user: req.user, errors, oldInput: req.body });
          return;
        }
        console.error(err);
      }
    },
    edit: async (req, res) => {
      const { user } = req;
      const { id } = req.params;
      const { name, description, imageUrl, difficultyLevel } = req.body;

      try {
        const updates = { name, description, imageUrl, difficultyLevel: +difficultyLevel }
        await models.Cube.updateOne({ _id: id, creatorId: user._id }, updates, { runValidators: true });
        res.redirect('/');
      } catch (err) {
        if (err.name === 'ValidationError') {
          const errors = [];
          Object.keys(err.errors).forEach(errorKey => errors.push(err.errors[errorKey]));
          const oldInput = { name, description, imageUrl, _id: id }
          res.render('cube/edit', { errors, user, cube: oldInput });
          return;
        }
        console.error(err);
      }
    },
    delete: async (req, res) => {
      try {
        const { user } = req;
        const { id } = req.params;
        await models.Cube.deleteOne({ _id: id, creatorId: user._id });
        res.redirect('/');
      } catch (err) {
        console.error(err);
      }
    }
  }
};