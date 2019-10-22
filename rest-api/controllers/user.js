const models = require('../models');

module.exports = {
  get: {
    users: async (req, res, next) => {
      try {
        const users = await models.User.find();
        res.send(users);
      } catch (err) {
        next(err);
      }
    },
    user: async (req, res, next) => {
      try {
        const { id } = req.params;
        const user = await models.User.findById(id);
        res.send(user);
      } catch (err) {
        next(err);
      }
    }
  },
  post: {
    user: async (req, res, next) => {
      try {
        let { email, firstName, lastName, password, isAdmin } = req.body;
        // isAdmin = typeof isAdmin === 'boolean' ? isAdmin : false;
        const newUser = await models.User.create({ email, firstName, lastName, password, isAdmin: isAdmin || false });
        res.status(201).send(newUser);
      } catch (err) {
        next(err);
      }
    }
  },
  put: {
    user: async (req, res, next) => {
      try {
        const { id } = req.params;
        const { email, firstName, lastName } = req.body;
        const updatedUser = await models.User.findOneAndUpdate({ _id: id }, { email, firstName, lastName });
        res.send(updatedUser);
      } catch (err) {
        next(err);
      }
    }
  },
  delete: {
    user: async (req, res, next) => {
      try {
        const { id } = req.params;
        const deletedUser = await models.User.findByIdAndDelete(id);
        res.send(deletedUser);
      } catch (err) {
        next(err);
      }
    }
  }
};