const jwt = require('./jwt');
const config = require('../config');
const models = require('../models');

module.exports = (adminOnly = false) => {
  return async (req, res, next) => {
    const token = req.cookies['auth_cookie'] || '';

    try {
      const data = await jwt.verifyToken(token);
      const user = await models.User.findById(data.id);

      if (adminOnly && !user.isAdmin) {
        throw new Error('User is not admin!');
      }

      req.user = user;
      next();
    } catch (err) {
      res.sendStatus(401);
    }
  }
};