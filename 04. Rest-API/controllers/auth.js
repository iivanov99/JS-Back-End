const models = require('../models');
const utils = require('../utils');

module.exports = {
  post: {
    register: async (req, res) => {
      const { email, firstName, lastName, password, repeatPassword } = req.body;

      if (password !== repeatPassword) {
        res.status(401).send({ error: 'Both passwords must match!' });
        return;
      }

      try {
        const createdUser = await models.User.create({ email, firstName, lastName, password });
        res.status(201).send(createdUser);
      } catch (err) {
        res.status(400).send(err.message);
      }
    },
    login: async (req, res, next) => {
      const { email, password } = req.body;

      try {
        const user = await models.User.findOne({ email });

        if (!user) {
          res.status(401).send({ error: 'Invalid email!' });
          return;
        }

        if (!await user.matchPassword(password)) {
          res.status(401).send({ error: 'Invalid password!' });
          return;
        }

        const token = await utils.jwt.createToken({ id: user._id });
        res.cookie('auth_cookie', token);
        res.send({ user });
      } catch (err) {
        next(err);
      }
    }
  }
};