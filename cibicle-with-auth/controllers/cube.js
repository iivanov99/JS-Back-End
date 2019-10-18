const Cube = require('../models/Cube');

module.exports = {
  createGet: (req, res) => {
    const { user } = req;
    res.render('cube/create', { user });
  },
  createPost: async (req, res) => {
    const { user } = req;

    try {
      const { name, description, imageUrl, difficultyLevel } = req.body;
      const newCube = { name, description, imageUrl, difficultyLevel: +difficultyLevel, creatorId: user._id };
      await Cube.create(newCube);
      res.redirect('/');
    } catch (err) {
      const errors = [];

      if (err.name === 'ValidationError') {
        Object.keys(err.errors).forEach(errKey => {
          errors.push(err.errors[errKey]);
        });
      }

      res.render('cube/create', { errors: err.errors, user });
    }
  },
  details: async (req, res) => {
    try {
      const { user } = req;
      const { id } = req.params;
      const cube = await Cube.findById(id).populate('accessories');

      if (user) {
        const isCreator = cube.creatorId === user._id.toString();
        res.render('cube/details', { cube, user, isCreator });
        return;
      }

      res.render('cube/details', { cube, user });
    } catch (err) {
      if (err.name === 'CastError' && err.kind === 'ObjectId') {
        res.redirect('/not-found');
        return;
      }
    }
  },
  editGet: async (req, res) => {
    try {
      const { user } = req;
      const { id: cubeId } = req.params;
      const cube = await Cube.findOne({ _id: cubeId, creatorId: user._id });
      if (!cube) { throw new Error('Current user is not the cube creator!'); }
      res.render('cube/edit', { cube, user })
    } catch (err) {
      if (err.name === 'CastError' && err.kind === 'ObjectId') {
        res.redirect('/not-found');
        return;
      }

      if (err.message === 'Current user is not the cube creator!') {
        res.redirect('/');
        return;
      }
    }
  },
  editPost: async (req, res) => {
    try {
      const { user } = req;
      const { id: cubeId } = req.params;
      const { name, description, imageUrl, difficultyLevel } = req.body;
      const updatedCube = { name, description, imageUrl, difficultyLevel: +difficultyLevel };
      await Cube.findOneAndUpdate({ _id: cubeId, creatorId: user._id }, updatedCube);
      res.redirect('/');
    } catch (error) {
      if (err.name === 'CastError' && err.kind === 'ObjectId') {
        res.redirect('/');
        return;
      }
    }
  },
  deleteGet: async (req, res) => {
    const difficultyToText = {
      1: '1 - Very Easy',
      2: '2 - Easy',
      3: '3 Medium (Standart 3x3)',
      4: '4 - Intermediate',
      5: '5 - Expert',
      6: '6 - Hardcore'
    };

    try {
      const { user } = req;
      const { id: cubeId } = req.params;
      const cube = await Cube.findOne({ _id: cubeId, creatorId: user._id });
      if (!cube) { throw new Error('Current user is not the cube creator!'); }
      res.render('cube/delete', { cube, user, difficultyToText: difficultyToText[cube.difficultyLevel] })
    } catch (err) {
      if (err.name === 'CastError' && err.kind === 'ObjectId') {
        res.redirect('/not-found');
        return;
      }

      if (err.message === 'Current user is not the cube creator!') {
        res.redirect('/');
        return;
      }
    }
  },
  deletePost: async (req, res) => {
    try {
      const { user } = req;
      const { id: cubeId } = req.params;
      await Cube.findOneAndDelete({ _id: cubeId, creatorId: user._id });
      res.redirect('/');
    } catch (err) {
      if (err.name === 'CastError' && err.kind === 'ObjectId') {
        res.redirect('/');
      }
    }
  }
};